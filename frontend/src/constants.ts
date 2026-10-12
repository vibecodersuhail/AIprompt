export interface SamplePrompt {
  category: 'Coding' | 'Writing' | 'Education' | 'Image Generation' | 'Data Analysis';
  title: string;
  text: string;
}

export const SAMPLE_PROMPTS: SamplePrompt[] = [
  {
    category: 'Coding',
    title: 'Algorithm & Validation',
    text: 'Create a program that sorts a list of numbers and handles invalid input.',
  },
  {
    category: 'Writing',
    title: 'Academic Extension Request',
    text: 'Write a professional email to my college professor requesting an extension for my assignment.',
  },
  {
    category: 'Education',
    title: 'History Lesson & Quiz',
    text: 'Teach me the causes and effects of the French Revolution as a history lesson for a college student. Explain the topic clearly and provide a short quiz at the end.',
  },
  {
    category: 'Image Generation',
    title: 'Futuristic Cyberpunk Landscape',
    text: 'Create an image of a futuristic Kerala city at sunset with modern buildings, coconut trees, glowing streets, and a cinematic atmosphere.',
  },
  {
    category: 'Data Analysis',
    title: 'Sales & Customer Transaction EDA',
    text: 'I have a dataset of 5,000 customer transactions. Analyze the sales data to find monthly sales trends, the best-performing products, unusual transactions, compare sales across different categories, and relationships between customer age and purchase amount. Present the findings using charts and summarize the main business insights.',
  },
];

export interface IntentCategoryMeta {
  name: string;
  badgeColor: string;
  borderColor: string;
  glowColor: string;
  iconName: string;
  tagline: string;
  description: string;
}

export const INTENT_CATEGORIES: IntentCategoryMeta[] = [
  {
    name: 'Coding',
    badgeColor: '#3b82f6',
    borderColor: 'rgba(59, 130, 246, 0.35)',
    glowColor: 'rgba(59, 130, 246, 0.2)',
    iconName: 'Code2',
    tagline: 'Software Architecture & Development',
    description: 'Build, debug, explain, or improve software and code.',
  },
  {
    name: 'Writing',
    badgeColor: '#8b5cf6',
    borderColor: 'rgba(139, 92, 246, 0.35)',
    glowColor: 'rgba(139, 92, 246, 0.2)',
    iconName: 'PenTool',
    tagline: 'Professional Prose & Communication',
    description: 'Create, rewrite, summarize, or improve written content.',
  },
  {
    name: 'Education',
    badgeColor: '#f59e0b',
    borderColor: 'rgba(245, 158, 11, 0.35)',
    glowColor: 'rgba(245, 158, 11, 0.2)',
    iconName: 'BookOpen',
    tagline: 'Pedagogical Tutorials & Concept Teaching',
    description: 'Learn concepts, study topics, and create educational material.',
  },
  {
    name: 'Image Generation',
    badgeColor: '#ec4899',
    borderColor: 'rgba(236, 72, 153, 0.35)',
    glowColor: 'rgba(236, 72, 153, 0.2)',
    iconName: 'ImageIcon',
    tagline: 'Cinematic & Artistic Visual Engineering',
    description: 'Describe scenes, styles, compositions, and visual concepts.',
  },
  {
    name: 'Data Analysis',
    badgeColor: '#10b981',
    borderColor: 'rgba(16, 185, 129, 0.35)',
    glowColor: 'rgba(16, 185, 129, 0.2)',
    iconName: 'BarChart3',
    tagline: 'Statistical EDA & Machine Learning',
    description: 'Analyze datasets, identify patterns, compare values, and extract insights.',
  },
];

export const MODEL_EVALUATION_FACTS = {
  modelType: 'LinearSVC',
  classWeight: 'balanced',
  featureExtractor: 'TF-IDF (Sublinear Term Frequency)',
  maxFeatures: 10000,
  ngramRange: 'Unigrams + Bigrams (1, 2)',
  stopWords: 'English',
  datasetSize: 1671,
  trainSamples: 1336,
  testSamples: 335,
  splitRatio: '80% Train / 20% Test (Stratified)',
  randomState: 42,
  testAccuracy: 0.6955,
  macroF1: 0.6679,
  weightedF1: 0.6859,
  baselineAccuracy: 0.5373,
  absoluteImprovementPP: 15.82,
  relativeImprovementPct: 29.44,
};

export const PIPELINE_STAGES = [
  {
    step: '01',
    title: 'Natural Language Query',
    description: 'User enters an unrefined task or problem statement in plain everyday English.',
    badge: 'Input Stage',
  },
  {
    step: '02',
    title: 'Text Preprocessing',
    description: 'Lowercasing, punctuation stripping, English stop-word filtering, and n-gram tokenization.',
    badge: 'NLP Pipeline',
  },
  {
    step: '03',
    title: 'TF-IDF Feature Extraction',
    description: 'Vectorizes input across a 10,000-term unigram/bigram vocabulary using sublinear frequency scaling.',
    badge: 'Feature Engineering',
  },
  {
    step: '04',
    title: 'LinearSVC Intent Classification',
    description: 'Calculates maximum-margin hyperplane decision distances across 5 intent classes.',
    badge: 'Machine Learning',
  },
  {
    step: '05',
    title: 'Domain Prompt Refinement',
    description: 'Applies intent-specific prompt engineering templates (Persona, Context, Task, Constraints).',
    badge: 'Prompt Engineering',
  },
  {
    step: '06',
    title: 'Structured Optimized Output',
    description: 'Delivers a ready-to-use, publication-grade markdown prompt with analysis and suggestions.',
    badge: 'Production Result',
  },
];
