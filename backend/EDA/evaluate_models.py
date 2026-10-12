import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.svm import LinearSVC
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report
)

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

# 2. Stratified 80/20 train/test split (exact same split as production pipeline)
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# Calculate majority-class baseline from Phase 2 for context
train_distribution = y_train.value_counts()
majority_class = train_distribution.idxmax()
y_pred_baseline = [majority_class] * len(y_test)
baseline_accuracy = accuracy_score(y_test, y_pred_baseline)

# 3. TF-IDF feature extraction (fit on training data only)
vectorizer = TfidfVectorizer(
    max_features=10000,
    stop_words="english",
    ngram_range=(1, 2),
    sublinear_tf=True
)

X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

# 4. Define candidate classical models
models = {
    "LinearSVC": LinearSVC(
        class_weight="balanced"
    ),
    "Logistic Regression": LogisticRegression(
        max_iter=2000,
        class_weight="balanced",
        random_state=42
    ),
    "Multinomial Naive Bayes": MultinomialNB()
}

print("================================================================================")
print("              PHASE 3: CLASSICAL NLP MODEL BENCHMARK EVALUATION                ")
print("================================================================================")
print(f"Dataset: Cleaned dataset ({len(df)} total samples)")
print(f"Training samples: {len(X_train)}")
print(f"Testing samples: {len(X_test)}")
print(f"Vocabulary size (TF-IDF features): {X_train_tfidf.shape[1]}")
print(f"Majority-class baseline accuracy: {baseline_accuracy * 100:.2f}% (Majority class: {majority_class})")
print("Current selected production model: LinearSVC(class_weight='balanced')")
print("================================================================================\n")

results = []

for name, clf in models.items():
    print(f"--- Evaluating {name} ---")
    clf.fit(X_train_tfidf, y_train)
    y_pred = clf.predict(X_test_tfidf)
    
    acc = accuracy_score(y_test, y_pred)
    macro_p = precision_score(y_test, y_pred, average="macro", zero_division=0)
    macro_r = recall_score(y_test, y_pred, average="macro", zero_division=0)
    macro_f1 = f1_score(y_test, y_pred, average="macro", zero_division=0)
    weighted_p = precision_score(y_test, y_pred, average="weighted", zero_division=0)
    weighted_r = recall_score(y_test, y_pred, average="weighted", zero_division=0)
    weighted_f1 = f1_score(y_test, y_pred, average="weighted", zero_division=0)
    
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, zero_division=0))
    
    results.append({
        "Model": name,
        "Accuracy": acc,
        "Macro Precision": macro_p,
        "Macro Recall": macro_r,
        "Macro F1": macro_f1,
        "Weighted Precision": weighted_p,
        "Weighted Recall": weighted_r,
        "Weighted F1": weighted_f1
    })

# Convert to DataFrame and sort by Accuracy descending
results_df = pd.DataFrame(results).sort_values(by="Accuracy", ascending=False).reset_index(drop=True)

print("================================================================================")
print("                          FINAL MODEL COMPARISON TABLE                          ")
print("================================================================================")
# Format display table
formatted_table = []
for _, row in results_df.iterrows():
    formatted_table.append({
        "Model": row["Model"],
        "Accuracy": f"{row['Accuracy'] * 100:.2f}%",
        "Macro Precision": f"{row['Macro Precision'] * 100:.2f}%",
        "Macro Recall": f"{row['Macro Recall'] * 100:.2f}%",
        "Macro F1": f"{row['Macro F1'] * 100:.2f}%",
        "Weighted F1": f"{row['Weighted F1'] * 100:.2f}%"
    })

comparison_df = pd.DataFrame(formatted_table)
print(comparison_df.to_string(index=False))

print("\nReference Baselines:")
print(f"  - Majority-Class Baseline Accuracy : {baseline_accuracy * 100:.2f}%")
print(f"  - Production LinearSVC Accuracy   : {results_df.loc[results_df['Model'] == 'LinearSVC', 'Accuracy'].values[0] * 100:.2f}%")
print("================================================================================")
