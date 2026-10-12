import pandas as pd
from sklearn.model_selection import train_test_split

# Load cleaned dataset
df = pd.read_csv("../dataset/prompt_refinement_dataset_cleaned.csv")

print("Dataset shape:")
print(df.shape)

# Features and target
X = df["input"]
y = df["intent"]

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("\nTraining samples:")
print(len(X_train))

print("\nTesting samples:")
print(len(X_test))

print("\nTraining intent distribution:")
print(y_train.value_counts())

print("\nTesting intent distribution:")
print(y_test.value_counts())