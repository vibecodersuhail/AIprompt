# Dataset Inspection & Exploratory Data Analysis Report
**Project:** AI Prompt Generator Using Data Science and Natural Language Processing  
**Dataset:** `prompt_refinement_dataset.csv`  
**Inspected Date:** October 2026  

---

## 1. Executive Summary & Verification

| Inspection Item | Value / Finding | Status |
| :--- | :--- | :--- |
| **File Location** | `C:/Users/dell/Desktop/AI-Prompt-Generator/data/prompt_refinement_dataset.csv` | Loaded Successfully |
| **Dataset Size** | 1,561 rows &times; 2 raw columns (2.48 MB) | Verified |
| **Missing Values** | 0 missing values across all columns | Clean |
| **Duplicate Rows** | 0 full duplicate rows | Clean |
| **Existing Columns** | `input` (object/str), `output` (object/str) | Verified |
| **Intent Labels** | **None** (Zero intent/category columns present) | Needs Labeling |

---

## 2. Column Roles & Semantic Breakdown

1. **`input` (Original Prompt):**
   - Represents the raw prompt supplied by the end-user.
   - Typically brief (median: 24 words, mean: 75.3 words), casual, under-specified, and missing contextual bounds.
2. **`output` (Refined Prompt):**
   - Represents the high-performance prompt optimized for LLM completion.
   - Typically long (median: 161 words, mean: 174.4 words), establishing explicit personas, constraints, tones, and formatting standards.
3. **`instructions` & `intent` columns:**
   - **Not present.** System instructions and tone parameters are baked directly into the output prompt rather than decoupled into separate metadata fields.

---

## 3. Five-Intent Feasibility & Coverage Analysis

The college project proposes five intent categories:
1. **Coding**
2. **Writing**
3. **Education**
4. **Image Generation**
5. **Data Analysis**

### Representation Breakdown:
| Target Category | Keyword/Heuristic Hits (Raw Inputs) | Estimated Coverage | Feasibility on Current Data |
| :--- | :--- | :--- | :--- |
| **Coding** | 335 (21.5%) | High | **Ready** (rich code, API, and debugging samples) |
| **Writing** | 320 (20.5%) | High | **Ready** (essays, articles, speeches, stories) |
| **Education** | 141 (9.0%) | Moderate | **Ready** (concept explanations, academic questions) |
| **Data Analysis** | 41 (2.6%) | Low-Moderate | **Partial** (overlaps heavily with Coding/Python) |
| **Image Generation** | 4 (0.3%) | **Critically Low** | **Deficient** (near zero generative AI image prompts) |

> [!WARNING]
> **Image Generation Prompt Deficiency:**
> Keyword matches for `image` in the raw dataset refer primarily to computer vision coding problems (e.g. OpenCV face detection) or general queries (e.g. Windows wallpaper image), not text-to-image prompts for engines like Midjourney or Stable Diffusion.

---

## 4. Why We Need Labeled Intent Columns & Additional Data

1. **Need for a Labeled Intent Column:**
   - To build an NLP intent classifier (e.g., TF-IDF + Logistic Regression/SVM, or fine-tuned Transformer), supervised classification algorithms require a ground-truth target variable (`y`). Without a labeled `intent` column, a classifier cannot be trained directly.
2. **Need for Additional Labeled Examples:**
   - Due to the severe deficit in **Image Generation** prompts and the overlap between **Data Analysis** and **Coding**, using the dataset alone will lead to extreme class imbalance and catastrophic misclassification for image prompts.
   - **Recommendation:** Construct a balanced intent dataset by synthetically augmenting or curating 150-250 verified examples for Image Generation and Data Analysis, and programmatically or manually tagging existing rows.

---

## 5. Statistical Profile & Refinement Insights

| Metric | Original Input | Refined Output | Difference / Ratio |
| :--- | :--- | :--- | :--- |
| **Mean Word Count** | 75.3 words | 174.4 words | **+99.1 words** |
| **Median Word Count** | 24.0 words | 161.0 words | **6.7x expansion** |
| **Median Char Length** | 139 chars | 1082 chars | **7.8x expansion** |
| **Persona Patterns** | N/A | 802 prompts (51.4%) | "Acting as...", "Assume the role..." |

---

## 6. Generated Figures

- `figures/length_distribution.png`: Comparative word count histogram & boxplot.
- `figures/expansion_factor.png`: Refinement expansion multiplier distribution.
- `figures/category_coverage.png`: Distribution of target intent categories.
- `figures/refinement_framing_strategies.png`: Breakdown of prompting strategies.
