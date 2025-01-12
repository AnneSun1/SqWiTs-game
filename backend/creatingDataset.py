import pandas as pd
import random

ontario_universities = {
    "University of Toronto": 5,
    "University of Waterloo": 4,
    "Western University": 3,
    "McMaster University": 4,
    "Queen's University": 4,
    "Carleton University": 2,
    "University of Ottawa": 3,
    "York University": 2,
    "Toronto Metropolitan University": 2,
    "Brock University": 1
}

def generate_dataset(num_rows=1000):
    data = []
    for _ in range(num_rows):
        age = random.randint(18, 30)
        university, difficulty = random.choice(list(ontario_universities.items()))
        exams_count = random.randint(1, 10)
        gpa = round(random.uniform(2.0, 4.0), 2)
        survival_score = (
            gpa * 0.4 + 
            exams_count * 0.3 + 
            difficulty * 0.3
        )
        survival_probability = survival_score / (4.0 * 0.4 + 10 * 0.3 + 5 * 0.3)
        survives = "Yes" if random.uniform(0, 1) < survival_probability else "No"
        data.append([age, university, exams_count, gpa, survives, round(survival_probability * 100, 2)])
    return pd.DataFrame(data, columns=["age", "university", "exams_count", "gpa", "survives", "survival_probability"])

dataset = generate_dataset(1000)
file_path = "sqWiTS_Games.xlsx"
dataset.to_excel(file_path, index=False)
print(f"Dataset created and saved to '{file_path}'")
print("Sample of the dataset:")
print(dataset.head())
