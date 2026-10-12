"""
Pydantic schemas for AI Prompt Generator API.
"""

from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class PromptRequest(BaseModel):
    prompt: str = Field(..., min_length=2, max_length=10000, description="Raw user prompt to optimize")
    override_intent: Optional[str] = Field(None, description="Optional user-selected intent to override model prediction")


class IntentPrediction(BaseModel):
    predicted_intent: str
    confidence: float
    all_scores: Dict[str, float]
    model_name: str


class StructuredBreakdown(BaseModel):
    persona: str
    context: str
    task: str
    constraints: str
    output_format: str


class PromptResponse(BaseModel):
    original_prompt: str
    detected_intent: str
    applied_intent: str
    confidence: float
    is_overridden: bool
    refined_prompt: str
    structured_breakdown: StructuredBreakdown
    suggestions: List[str]
    processing_time_ms: float


class ModelInfoResponse(BaseModel):
    model_name: str
    algorithm: str
    classes: List[str]
    test_accuracy: float
    test_macro_f1: float
    vectorizer_features: int
    train_samples: int
    test_samples: int
    status: str


class CategoryDetail(BaseModel):
    name: str
    badge_color: str
    icon: str
    description: str
    sample_prompt: str
    optimization_focus: str


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    version: str
    timestamp: str
