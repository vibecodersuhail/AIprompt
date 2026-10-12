export interface CategoryDetail {
  name: string;
  badge_color: string;
  icon: string;
  description: string;
  sample_prompt: string;
  optimization_focus: string;
}

export interface StructuredBreakdown {
  persona: string;
  context: string;
  task: string;
  constraints: string;
  output_format: string;
}

export interface PromptResponse {
  original_prompt: string;
  detected_intent: string;
  applied_intent: string;
  confidence: number;
  is_overridden: boolean;
  refined_prompt: string;
  structured_breakdown: StructuredBreakdown;
  suggestions: string[];
  processing_time_ms: number;
}

export interface IntentPrediction {
  predicted_intent: string;
  confidence: number;
  all_scores: Record<string, number>;
  model_name: string;
}

export interface ModelInfo {
  model_name: string;
  algorithm: string;
  classes: string[];
  test_accuracy: number;
  test_macro_f1: number;
  vectorizer_features: number;
  train_samples: number;
  test_samples: number;
  status: string;
}
