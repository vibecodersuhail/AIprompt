import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer

# Load cleaned dataset
df = pd.read_csv("../dataset/prompt_refinement_dataset_cleaned.csv")

# Input and target
X = df["input"]
y = df["intent"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

# Create TF-IDF vectorizer
vectorizer = TfidfVectorizer(
    max_features=5000,
    stop_words="english"
)

# Learn vocabulary from training data
X_train_tfidf = vectorizer.fit_transform(X_train)

# Transform testing data using the same vocabulary
X_test_tfidf = vectorizer.transform(X_test)

print("TF-IDF conversion completed.")

print("\nTraining data shape:")
print(X_train_tfidf.shape)

print("\nTesting data shape:")
print(X_test_tfidf.shape)

print("\nNumber of TF-IDF features:")
print(len(vectorizer.get_feature_names_out()))

print("\nFirst 20 features:")
print(vectorizer.get_feature_names_out()[:20])