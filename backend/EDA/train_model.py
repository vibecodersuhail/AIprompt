import os
import joblib
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.svm import LinearSVC
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    ConfusionMatrixDisplay
)

# Load cleaned dataset
df = pd.read_csv("../dataset/prompt_refinement_dataset_cleaned.csv")

# Input and target
X = df["input"]
y = df["intent"]

# Fit LabelEncoder on original intent labels only for creating label_encoder.joblib
label_encoder = LabelEncoder()
label_encoder.fit(y)

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# TF-IDF
vectorizer = TfidfVectorizer(
    max_features=10000,
    stop_words="english",
    ngram_range=(1, 2),
    sublinear_tf=True
)

X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

# Train Linear SVM using original string intent labels
model = LinearSVC(class_weight="balanced")

model.fit(X_train_tfidf, y_train)

# Predict test data
y_pred = model.predict(X_test_tfidf)

# Accuracy
accuracy = accuracy_score(y_test, y_pred)

print("Model training completed.")

print("\nAccuracy:")
print(f"{accuracy:.4f}")

# Classification report
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Confusion matrix
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# Confusion matrix visualization
ConfusionMatrixDisplay.from_predictions(
    y_test,
    y_pred,
    xticks_rotation=45
)

plt.title("Intent Classification Confusion Matrix")
plt.tight_layout()
plt.show()

# Create model directory
os.makedirs("../models", exist_ok=True)
os.makedirs("models", exist_ok=True)

# Save model
joblib.dump(model, "../models/intent_model.joblib")
if os.path.exists("models") and os.path.abspath("models") != os.path.abspath("../models"):
    joblib.dump(model, "models/intent_model.joblib")

# Save TF-IDF vectorizer
joblib.dump(vectorizer, "../models/tfidf_vectorizer.joblib")
if os.path.exists("models") and os.path.abspath("models") != os.path.abspath("../models"):
    joblib.dump(vectorizer, "models/tfidf_vectorizer.joblib")

# Save LabelEncoder
joblib.dump(label_encoder, "../models/label_encoder.joblib")
if os.path.exists("models") and os.path.abspath("models") != os.path.abspath("../models"):
    joblib.dump(label_encoder, "models/label_encoder.joblib")

print("\nModel saved to:")
print("../models/intent_model.joblib")

print("\nVectorizer saved to:")
print("../models/tfidf_vectorizer.joblib")

print("\nLabelEncoder saved to:")
print("../models/label_encoder.joblib")