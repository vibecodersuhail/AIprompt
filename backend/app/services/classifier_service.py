"""
Classifier service for AI Prompt Generator.
Loads and runs inference with the trained Linear SVM model and TF-IDF vectorizer.
"""

import json
import logging
from pathlib import Path
from typing import Dict, List, Optional, Tuple
import joblib
import numpy as np

logger = logging.getLogger("classifier_service")

def _looks_like_coding_request(text: str) -> bool:
    """Recognize clear programming and software-development requests."""
    t = text.lower()

    coding_terms = [
        "react", "javascript", "typescript", "python", "html", "css",
        "programming", "write code", "code for", "debug", "debugging",
        "api endpoint", "function", "software", "web app", "website",
        "login page", "form validation", "sql query", "component",
        "build an app", "create an app", "implement a", "write a script"
    ]

    return any(term in t for term in coding_terms)


class IntentClassifierService:
    def __init__(self, models_dir: Optional[Path] = None):
        self.models_dir = (
        models_dir.resolve()
        if models_dir is not None
        else Path(__file__).resolve().parents[3] / "models"
        )
        self.model = None
        self.vectorizer = None
        self.label_encoder = None
        self.metadata = {}
        self.is_loaded = False
        self.load_artifacts()

    def load_artifacts(self) -> bool:
        """Load serialized model artifacts from disk."""
        model_path = self.models_dir / "intent_model.joblib"
        vec_path = self.models_dir / "tfidf_vectorizer.joblib"
        le_path = self.models_dir / "label_encoder.joblib"
        meta_path = self.models_dir / "model_metadata.json"

        if not (model_path.exists() and vec_path.exists() and le_path.exists()):
            logger.warning(
                f"Model artifacts not found in {self.models_dir}. "
                "Inference will fall back to heuristic detection."
            )
            self.is_loaded = False
            return False

        try:
            self.model = joblib.load(model_path)
            self.vectorizer = joblib.load(vec_path)
            self.label_encoder = joblib.load(le_path)

            if meta_path.exists():
                with open(meta_path, "r", encoding="utf-8") as f:
                    self.metadata = json.load(f)
            else:
                self.metadata = {
                    "model_name": "Linear SVM",
                    "algorithm": "LinearSVC",
                    "classes": list(self.label_encoder.classes_)
                }

            self.is_loaded = True
            logger.info("Successfully loaded ML model and vectorizer.")
            return True
        except Exception as e:
            logger.error(f"Error loading model artifacts: {e}")
            self.is_loaded = False
            return False

    def predict(self, text: str) -> Tuple[str, float, Dict[str, float]]:
        """
        Predict intent category and calibrated confidence score using softmax
        over LinearSVC decision function scores.
        """
        if not self.is_loaded:
            # Fallback heuristic if models are somehow not loaded
            return self._heuristic_fallback(text)

        cleaned_text = text.strip()
        features = self.vectorizer.transform([cleaned_text])

        # Obtain decision function margins
        margins = self.model.decision_function(features)
        
        # Binary or Multiclass handling
        if len(margins.shape) == 1:
            # Binary classification case
            m = margins[0]
            prob = 1.0 / (1.0 + np.exp(-m))
            probs = np.array([1.0 - prob, prob])
        else:
            # Multiclass softmax conversion
            exp_scores = np.exp(margins[0] - np.max(margins[0]))
            probs = exp_scores / np.sum(exp_scores)

        pred_idx = int(np.argmax(probs))
        confidence = float(probs[pred_idx])
        pred_label = str(self.label_encoder.inverse_transform([pred_idx])[0])
        if _looks_like_coding_request(cleaned_text):
         pred_label = "Coding"
        confidence = max(confidence, 0.80)

        all_scores = {
            str(cls): float(round(p, 4))
            for cls, p in zip(self.label_encoder.classes_, probs)
        }

        return pred_label, float(round(confidence, 4)), all_scores

    def _heuristic_fallback(self, text: str) -> Tuple[str, float, Dict[str, float]]:
        """Simple fallback rule matcher if ML model is offline."""
        t = text.lower()
        if any(w in t for w in ["code", "python", "function", "api", "bug", "sql", "java", "script"]):
            cat = "Coding"
        elif any(w in t for w in ["image", "photo", "render", "midjourney", "draw", "painting"]):
            cat = "Image Generation"
        elif any(w in t for w in ["data", "pandas", "eda", "analysis", "statistics", "churn"]):
            cat = "Data Analysis"
        elif any(w in t for w in ["explain", "concept", "teach", "why does", "history of", "lesson"]):
            cat = "Education"
        else:
            cat = "Writing"

        scores = {c: 0.20 for c in ["Coding", "Writing", "Education", "Image Generation", "Data Analysis"]}
        scores[cat] = 0.60
        return cat, 0.60, scores

    def get_classes(self) -> List[str]:
        if self.is_loaded and self.label_encoder is not None:
            return list(self.label_encoder.classes_)
        return ["Coding", "Data Analysis", "Education", "Image Generation", "Writing"]

    def get_metadata(self) -> Dict:
        return self.metadata


# Global singleton instance
classifier_service = IntentClassifierService()
