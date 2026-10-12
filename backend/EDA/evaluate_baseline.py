import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

# Locate cleaned dataset with robust path resolution
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

# Stratified 80/20 train/test split matching existing pipeline
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# Training class distribution
train_distribution = y_train.value_counts()
train_percentages = y_train.value_counts(normalize=True) * 100

# Determine majority class ONLY from training data
majority_class = train_distribution.idxmax()

# Majority-class predictions on test set
y_pred_baseline = [majority_class] * len(y_test)

# Calculate baseline accuracy using sklearn
baseline_accuracy = accuracy_score(y_test, y_pred_baseline)

# Selected LinearSVC model accuracy from train_model.py
linear_svc_accuracy = 0.6955

# Calculate improvement in percentage points
improvement_pp = (linear_svc_accuracy - baseline_accuracy) * 100

# Print formatted baseline report
print("=== Majority-Class Baseline ===")
print()
print("Dataset:")
print("Cleaned dataset")
print()
print("Training samples:")
print(len(X_train))
print()
print("Testing samples:")
print(len(X_test))
print()
print("Training-Class Distribution:")
for intent, count in train_distribution.items():
    pct = train_percentages[intent]
    print(f"  - {intent:<18}: {count:>4} samples ({pct:>5.2f}%)")
print()
print("Majority class:")
print(majority_class)
print()
print("Baseline accuracy:")
print(f"{baseline_accuracy * 100:.2f}% ({baseline_accuracy:.4f})")
print()
print("Current LinearSVC accuracy:")
print(f"{linear_svc_accuracy * 100:.2f}%")
print()
print("Improvement over baseline:")
print(f"+{improvement_pp:.2f} percentage points")
