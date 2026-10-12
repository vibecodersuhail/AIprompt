# SmartPrompt — AI Prompt Generator

SmartPrompt is an ML-powered prompt generation and refinement system that classifies a user's request into one of five intents and then generates a more structured, task-specific prompt.

The project combines **Data Science, Machine Learning, NLP, FastAPI, and React** into one complete application.

## What It Does

SmartPrompt takes a user's natural-language request and processes it through an ML pipeline:

**User Prompt → TF-IDF → LinearSVC → Intent Detection → Prompt Refinement → Structured Prompt**

It supports five intent categories:

- 💻 Coding
- ✍️ Writing
- 🎓 Education
- 🎨 Image Generation
- 📊 Data Analysis

## Machine Learning

The intent classifier uses:

- **TF-IDF Vectorization**
- **10,000 maximum features**
- **Unigrams + Bigrams**
- **LinearSVC**
- **Class-balanced training**
- **80/20 stratified train-test split**

### Final Model Performance

| Metric | Score |
|---|---:|
| Accuracy | **69.55%** |
| Balanced Accuracy | **63.21%** |
| Macro Precision | **71.88%** |
| Macro Recall | **63.21%** |
| Macro F1 | **66.79%** |
| Weighted F1 | **68.59%** |

The majority-class baseline achieved **53.73% accuracy**, giving the final model an improvement of **15.82 percentage points**.

## Dataset

The project uses a labeled prompt dataset containing examples for five different intent categories.

The data-science workflow includes:

- Exploratory Data Analysis
- Missing-value analysis
- Duplicate detection
- Data cleaning
- Class distribution analysis
- Text-length analysis
- TF-IDF feature engineering
- Model training
- Model benchmarking
- Confusion-matrix analysis
- Error analysis
- Feature interpretability

## Intent-Specific Prompt Refinement

After detecting the user's intent, SmartPrompt applies different refinement strategies.

### Coding
Focuses on programming language, framework, inputs/outputs, edge cases, error handling, and implementation requirements.

### Writing
Focuses on audience, tone, purpose, structure, length, and writing style.

### Education
Focuses on learner level, explanation depth, examples, learning objectives, and practice activities.

### Image Generation
Focuses on subject, environment, composition, lighting, visual style, camera/view, and aspect ratio.

### Data Analysis
Focuses on analytical objectives, data-quality checks, statistics, trends, anomalies, visualizations, findings, and recommendations.

## Technology Stack

### Machine Learning
- Python
- Pandas
- NumPy
- Scikit-learn
- TF-IDF
- LinearSVC
- Joblib
- Matplotlib

### Backend
- FastAPI
- Uvicorn
- Pydantic

### Frontend
- React
- TypeScript
- Vite

## Project Architecture

```text
User
  │
  ▼
React + TypeScript Frontend
  │
  ▼
FastAPI Backend
  │
  ▼
TF-IDF Vectorizer
  │
  ▼
LinearSVC Intent Classifier
  │
  ▼
Intent Detection
  │
  ▼
Intent-Specific Prompt Refinement
  │
  ▼
Structured Prompt Output
