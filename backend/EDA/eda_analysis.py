import pandas as pd

# Load the labeled dataset
df = pd.read_csv("../dataset/prompt_refinement_dataset_labeled.csv")

# Display first 5 rows
print("First 5 rows:")
print(df.head())

# Dataset shape
print("\nDataset shape:")
print(df.shape)

# Column names
print("\nColumn names:")
print(df.columns.tolist())

# Data types
print("\nData types:")
print(df.dtypes)

# Missing values
print("\nMissing values:")
print(df.isnull().sum())

# Duplicate rows
print("\nDuplicate rows:")
print(df.duplicated().sum())

# Intent distribution
print("\nIntent distribution:")
print(df["intent"].value_counts())
# Prompt length analysis
df["input_length"] = df["input"].str.len()
df["output_length"] = df["output"].str.len()

print("\nInput prompt length statistics:")
print(df["input_length"].describe())

print("\nOutput prompt length statistics:")
print(df["output_length"].describe())
# Intent distribution visualization
import matplotlib.pyplot as plt

intent_counts = df["intent"].value_counts()

plt.figure(figsize=(8, 5))
intent_counts.plot(kind="bar")

plt.title("Intent Distribution")
plt.xlabel("Intent")
plt.ylabel("Number of Prompts")
plt.xticks(rotation=45)
plt.tight_layout()

plt.show()
# Average prompt length by intent
avg_length = df.groupby("intent")[["input_length", "output_length"]].mean()

print("\nAverage prompt and output length by intent:")
print(avg_length)
# Most common words in input prompts
from collections import Counter
import re

text = " ".join(df["input"].astype(str)).lower()

words = re.findall(r"\b[a-zA-Z]{3,}\b", text)

word_counts = Counter(words)

print("\nTop 20 most common words:")
for word, count in word_counts.most_common(20):
    print(f"{word}: {count}")
# Top 20 word frequency visualization
top_words = word_counts.most_common(20)

words_list = [item[0] for item in top_words]
counts_list = [item[1] for item in top_words]

plt.figure(figsize=(10, 6))
plt.bar(words_list, counts_list)

plt.title("Top 20 Most Common Words in Input Prompts")
plt.xlabel("Words")
plt.ylabel("Frequency")
plt.xticks(rotation=60)
plt.tight_layout()

plt.show()
# Check duplicate input prompts
duplicate_inputs = df["input"].duplicated().sum()

print("\nDuplicate input prompts:")
print(duplicate_inputs)

print("\nTop repeated input prompts:")
print(df["input"].value_counts().head(10))
# Relationship between input and output length
correlation = df["input_length"].corr(df["output_length"])

print("\nCorrelation between input and output length:")
print(correlation)
# Final EDA summary
print("\n" + "=" * 50)
print("FINAL EDA SUMMARY")
print("=" * 50)

print(f"Total records: {len(df)}")
print(f"Total columns: {df.shape[1]}")
print(f"Missing values: {df.isnull().sum().sum()}")
print(f"Duplicate rows: {df.duplicated().sum()}")
print(f"Duplicate input prompts: {df['input'].duplicated().sum()}")

print("\nIntent distribution:")
print(df["intent"].value_counts())

print(f"\nAverage input length: {df['input_length'].mean():.2f}")
print(f"Average output length: {df['output_length'].mean():.2f}")

print(f"\nInput-output length correlation: {correlation:.4f}")