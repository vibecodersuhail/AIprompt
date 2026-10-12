import type { CategoryDetail, ModelInfo, PromptResponse } from '../types';

const API_BASE = 'http://localhost:8000';

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/health`, { method: 'GET' });
    if (!res.ok) return false;
    const data = await res.json();
    return data.status === 'healthy';
  } catch {
    return false;
  }
}

export async function getCategories(): Promise<CategoryDetail[]> {
  const res = await fetch(`${API_BASE}/api/categories`);
  if (!res.ok) {
    throw new Error('Failed to load categories');
  }
  return res.json();
}

export async function getModelInfo(): Promise<ModelInfo> {
  const res = await fetch(`${API_BASE}/api/model-info`);
  if (!res.ok) {
    throw new Error('Failed to fetch model info');
  }
  return res.json();
}

export async function generateOptimizedPrompt(
  prompt: string,
  overrideIntent?: string
): Promise<PromptResponse> {
  const payload: { prompt: string; override_intent?: string } = {
    prompt: prompt.trim(),
  };

  if (overrideIntent && overrideIntent !== 'auto') {
    payload.override_intent = overrideIntent;
  }

  const res = await fetch(`${API_BASE}/api/generate-prompt`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Server error (${res.status})`);
  }

  return res.json();
}
