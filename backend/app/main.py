"""
FastAPI Backend Application Entrypoint
Project: AI Prompt Generator Using Data Science and Natural Language Processing
"""

import time
from datetime import datetime
from pathlib import Path
from typing import List

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import (
    CategoryDetail,
    HealthResponse,
    IntentPrediction,
    ModelInfoResponse,
    PromptRequest,
    PromptResponse,
)
from app.services.classifier_service import classifier_service
from app.services.prompt_refiner import prompt_refiner

app = FastAPI(
    title="AI Prompt Generator API",
    description="Backend API powering the AI Prompt Generator using Machine Learning Intent Classification & Natural Language Processing.",
    version="1.0.0",
)

# Enable CORS for frontend development and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CATEGORIES_METADATA = [
    CategoryDetail(
        name="Coding",
        badge_color="blue",
        icon="code",
        description="Programming, algorithms, APIs, debugging, refactoring, and software architecture.",
        sample_prompt="Write a Python script to implement an LRU cache with O(1) get and put operations.",
        optimization_focus="Production architecture, SOLID principles, type annotations, Big-O complexity, and unit tests."
    ),
    CategoryDetail(
        name="Writing",
        badge_color="purple",
        icon="pen-tool",
        description="Essays, articles, creative storytelling, copywriting, emails, and speeches.",
        sample_prompt="Write a compelling 600-word blog post on how generative AI is transforming modern education.",
        optimization_focus="Arresting hooks, prose rhythm, persuasive rhetoric, structured narrative headers, and polished voice."
    ),
    CategoryDetail(
        name="Education",
        badge_color="amber",
        icon="book-open",
        description="Academic concepts, scientific explanations, history, philosophy, and interactive tutorials.",
        sample_prompt="Explain quantum entanglement and Einstein's spooky action at a distance for high school physics students.",
        optimization_focus="Feynman technique, intuitive real-world analogies, step-by-step conceptual walkthroughs, and self-assessment quizzes."
    ),
    CategoryDetail(
        name="Image Generation",
        badge_color="pink",
        icon="image",
        description="Generative AI visual prompts for Midjourney v6, DALL-E 3, and Stable Diffusion XL.",
        sample_prompt="A cyberpunk street market in Neo-Tokyo in the rain with holographic signs and neon reflections.",
        optimization_focus="Sensory micro-textures, camera lenses (85mm, f/1.8), cinematic lighting, volumetric atmosphere, aspect ratios (--ar 16:9), and negative prompts."
    ),
    CategoryDetail(
        name="Data Analysis",
        badge_color="emerald",
        icon="bar-chart-2",
        description="Exploratory data analysis, statistics, machine learning, Pandas, SQL queries, and metrics.",
        sample_prompt="Perform exploratory data analysis on a customer churn dataset and train a Random Forest classifier in Python.",
        optimization_focus="Hypothesis testing, clean vectorized pipelines, outlier treatment, feature engineering, and metric interpretations."
    ),
]


@app.get("/", tags=["Health"])
def root():
    return {
        "project": "AI Prompt Generator Using Data Science and Natural Language Processing",
        "status": "online",
        "docs_url": "/docs",
        "model_loaded": classifier_service.is_loaded
    }


@app.get("/api/health", response_model=HealthResponse, tags=["Health"])
def health_check():
    return HealthResponse(
        status="healthy",
        model_loaded=classifier_service.is_loaded,
        version="1.0.0",
        timestamp=datetime.now().isoformat()
    )


@app.get("/api/categories", response_model=List[CategoryDetail], tags=["Categories"])
def get_categories():
    """Return supported intent categories with descriptions and sample queries."""
    return CATEGORIES_METADATA


@app.get("/api/model-info", response_model=ModelInfoResponse, tags=["Machine Learning"])
def get_model_info():
    """Return model architecture, parameters, and verified evaluation metrics."""
    meta = classifier_service.get_metadata()
    eval_metrics = meta.get("evaluation_metrics", {})
    return ModelInfoResponse(
        model_name=meta.get("model_name", "Linear SVM"),
        algorithm=meta.get("algorithm", "LinearSVC"),
        classes=classifier_service.get_classes(),
        test_accuracy=eval_metrics.get("Accuracy", 0.7211),
        test_macro_f1=eval_metrics.get("Macro F1", 0.6961),
        vectorizer_features=meta.get("vectorizer_config", {}).get("max_features", 8000),
        train_samples=meta.get("train_samples", 1416),
        test_samples=meta.get("test_samples", 355),
        status="Loaded & Active" if classifier_service.is_loaded else "Heuristic Mode"
    )


@app.post("/api/predict-intent", response_model=IntentPrediction, tags=["Machine Learning"])
def predict_intent(request: PromptRequest):
    """Predict the user's intent using the TF-IDF and Linear SVM classifier."""
    if not request.prompt.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Prompt text cannot be empty."
        )

    intent, confidence, all_scores = classifier_service.predict(request.prompt)
    return IntentPrediction(
        predicted_intent=intent,
        confidence=confidence,
        all_scores=all_scores,
        model_name=classifier_service.get_metadata().get("model_name", "Linear SVM")
    )


@app.post("/api/generate-prompt", response_model=PromptResponse, tags=["Prompt Generator"])
def generate_optimized_prompt(request: PromptRequest):
    """
    Main endpoint:
    1. Classifies the raw prompt's intent using the ML model.
    2. Respects optional user category override if supplied.
    3. Feeds the classified intent into the prompt refinement engine.
    4. Returns the structured optimized prompt and component breakdown.
    """
    start_time = time.time()
    clean_prompt = request.prompt.strip()

    if len(clean_prompt) < 2:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Prompt must contain at least 2 characters."
        )

    # 1. ML Intent Classification
    predicted_intent, confidence, _ = classifier_service.predict(clean_prompt)

    # 2. Category selection (Model prediction vs User override)
    is_overridden = False
    applied_intent = predicted_intent

    valid_categories = [c.name for c in CATEGORIES_METADATA]
    if request.override_intent and request.override_intent in valid_categories:
        applied_intent = request.override_intent
        is_overridden = (applied_intent != predicted_intent)

    # 3. Prompt Refinement Engine Generation
    refined_prompt, breakdown, suggestions = prompt_refiner.refine_prompt(
        clean_prompt, applied_intent
    )

    elapsed_ms = round((time.time() - start_time) * 1000, 2)

    return PromptResponse(
        original_prompt=clean_prompt,
        detected_intent=predicted_intent,
        applied_intent=applied_intent,
        confidence=confidence,
        is_overridden=is_overridden,
        refined_prompt=refined_prompt,
        structured_breakdown=breakdown,
        suggestions=suggestions,
        processing_time_ms=elapsed_ms
    )
