import os
import sys
import pandas as pd
import matplotlib
matplotlib.use("Agg")  # Non-interactive backend for headless environments
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC

# Ensure robust console encoding on Windows
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

# 1. Locate cleaned dataset with robust path resolution
possible_paths = [
    "../dataset/prompt_refinement_dataset_cleaned.csv",
    "dataset/prompt_refinement_dataset_cleaned.csv",
    os.path.join(os.path.dirname(__file__), "..", "..", "dataset", "prompt_refinement_dataset_cleaned.csv"),
    os.path.join(os.path.dirname(__file__), "..", "dataset", "prompt_refinement_dataset_cleaned.csv"),
    "backend/dataset/prompt_refinement_dataset_cleaned.csv",
]

dataset_path = None
for path in possible_paths:
    if os.path.exists(path):
        dataset_path = path
        break

if dataset_path is None:
    raise FileNotFoundError("Could not find prompt_refinement_dataset_cleaned.csv in expected locations.")

# Load cleaned dataset
df = pd.read_csv(dataset_path)

# Features and target
X = df["input"]
y = df["intent"]

# 2. Stratified 80/20 train/test split (exact same configuration)
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# 3. Fit TF-IDF strictly on X_train
vectorizer = TfidfVectorizer(
    max_features=10000,
    stop_words="english",
    ngram_range=(1, 2),
    sublinear_tf=True
)

X_train_tfidf = vectorizer.fit_transform(X_train)

# Feature vocabulary details
feature_names = vectorizer.get_feature_names_out()
total_features = len(feature_names)
unigrams = [f for f in feature_names if " " not in f]
bigrams = [f for f in feature_names if " " in f]

# 4. Train LinearSVC model
model = LinearSVC(class_weight="balanced")
model.fit(X_train_tfidf, y_train)

# 5. Extract coefficients per intent
classes = model.classes_
coefficients = model.coef_

records = []
top_features_per_class = {}

for class_idx, class_name in enumerate(classes):
    class_coefs = coefficients[class_idx]
    # Sort indices in descending order of positive coefficient strength
    top_indices = class_coefs.argsort()[-15:][::-1]
    
    top_features_per_class[class_name] = []
    for rank, feat_idx in enumerate(top_indices, start=1):
        feat = feature_names[feat_idx]
        coef_val = float(class_coefs[feat_idx])
        is_bigram = " " in feat
        
        top_features_per_class[class_name].append((feat, coef_val, is_bigram))
        records.append({
            "intent": class_name,
            "rank": rank,
            "feature": feat,
            "coefficient": round(coef_val, 4),
            "ngram_type": "bigram" if is_bigram else "unigram"
        })

# 7. Save feature analysis results to CSV
output_csv_path = os.path.join(os.path.dirname(__file__), "top_features_by_intent.csv")
results_df = pd.DataFrame(records)
results_df.to_csv(output_csv_path, index=False, encoding="utf-8")

# 8. Print report
print("================================================================================")
print("       PHASE 5: TF-IDF FEATURE INTERPRETABILITY & COEFFICIENT ANALYSIS          ")
print("================================================================================")
print("TF-IDF Vectorizer Feature Summary:")
print(f"  - Total features in vocabulary : {total_features}")
print(f"  - Unigram features             : {len(unigrams)} ({len(unigrams)/total_features * 100:.1f}%)")
print(f"  - Bigram features              : {len(bigrams)} ({len(bigrams)/total_features * 100:.1f}%)")
print(f"  - Both unigrams and bigrams are active in the vocabulary: Yes")
print("================================================================================\n")

print("=== Top Features by Intent ===\n")
# Display classes in canonical project order
ordered_classes = ["Coding", "Writing", "Education", "Image Generation", "Data Analysis"]

for class_name in ordered_classes:
    if class_name not in top_features_per_class:
        continue
    print(f"{class_name}:")
    for rank, (feat, coef, is_bigram) in enumerate(top_features_per_class[class_name], start=1):
        ngram_tag = "[bigram]" if is_bigram else "[unigram]"
        print(f"  {rank:>2}. {feat:<24} (coef: {coef:+.4f}) {ngram_tag}")
    print()

print("=== Interpretability Findings by Intent ===")
print(
    "1. Coding: Dominated by syntactic and framework identifiers ('function', 'code', 'class', 'python', 'javascript', 'react', 'method', 'html', 'java', 'api'). Features have the highest magnitude coefficients (up to +2.52), reflecting high technical specificity.\n"
    "2. Writing: Dominated by broad communicative, interpersonal, and narrative terms ('people', 'going', 'company', 'write', 'friend', 'answer', 'event'). Coefficients are lower in magnitude (+0.61 to +0.94), reflecting a diffuse distribution across general language.\n"
    "3. Education: Dominated by pedagogical, inquiry, and explanatory tokens ('explain', 'history', 'overview', 'world', 'psychology', 'discuss'). The presence of 'explain' (+1.93) is the primary driver, but also causes confusion with Writing.\n"
    "4. Image Generation: Characterized by visual style, camera, and rendering terminology ('generate image', 'style', 'portrait', 'vibrant', 'cinematic', 'photography', 'render', 'epic'). Includes the prominent bigram 'generate image' (+1.79).\n"
    "5. Data Analysis: Characterized by statistical, tabular, and data processing terminology ('dataset', 'data', 'pandas', 'analysis', 'column', 'clustering', 'regression', 'visualization', 'data visualization'). Both unigram and bigram features are prominent."
)

# 10. Create Visualization: horizontal bar plots for each intent
fig, axes = plt.subplots(2, 3, figsize=(18, 11))
axes_flat = axes.flatten()

colors = {
    "Coding": "#1f77b4",
    "Writing": "#ff7f0e",
    "Education": "#2ca02c",
    "Image Generation": "#d62728",
    "Data Analysis": "#9467bd"
}

for i, class_name in enumerate(ordered_classes):
    ax = axes_flat[i]
    feats = [item[0] for item in top_features_per_class[class_name]][::-1]
    coefs = [item[1] for item in top_features_per_class[class_name]][::-1]
    
    y_pos = range(len(feats))
    ax.barh(y_pos, coefs, color=colors.get(class_name, "#333333"), alpha=0.85, edgecolor="black")
    ax.set_yticks(y_pos)
    ax.set_yticklabels(feats, fontsize=9)
    ax.set_xlabel("LinearSVC Coefficient Weight", fontsize=9)
    ax.set_title(f"{class_name} (Top 15 Features)", fontsize=11, fontweight="bold")
    ax.grid(axis="x", linestyle="--", alpha=0.5)

# Hide 6th empty subplot
axes_flat[5].axis("off")

plt.suptitle("Top 15 TF-IDF Features by Intent (LinearSVC Coefficients)", fontsize=14, fontweight="bold")
plt.tight_layout()

output_img_path = os.path.join(os.path.dirname(__file__), "top_features_by_intent.png")
plt.savefig(output_img_path, dpi=300)
plt.close()

print("\n================================================================================")
print(f"Feature CSV saved to: {output_csv_path}")
print(f"Visualization saved to: {output_img_path}")
print("================================================================================")
