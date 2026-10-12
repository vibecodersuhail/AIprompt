import pandas as pd

# Load the original labeled dataset
df = pd.read_csv("../dataset/prompt_refinement_dataset_labeled.csv")

print("Original dataset shape:")
print(df.shape)

print("\nOriginal duplicate rows:")
print(df.duplicated().sum())

# Remove exact duplicate rows
df_clean = df.drop_duplicates().copy()

print("\nCleaned dataset shape:")
print(df_clean.shape)

print("\nRemaining duplicate rows:")
print(df_clean.duplicated().sum())

# Save cleaned dataset
output_path = "../dataset/prompt_refinement_dataset_cleaned.csv"
df_clean.to_csv(output_path, index=False)

print("\nCleaned dataset saved to:")
print(output_path)
# Verify cleaned dataset
print("\nCleaned dataset information:")
print(df_clean.info())

print("\nMissing values:")
print(df_clean.isnull().sum())

print("\nIntent distribution after cleaning:")
print(df_clean["intent"].value_counts())