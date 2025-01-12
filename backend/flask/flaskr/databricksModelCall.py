import os
from dotenv import load_dotenv
import pandas as pd
import mlflow.sklearn

load_dotenv()

MLFLOW_TRACKING_URI = os.getenv("MLFLOW_TRACKING_URI", "databricks")
DATABRICKS_HOST = os.getenv("DATABRICKS_HOST")
DATABRICKS_TOKEN = os.getenv("DATABRICKS_TOKEN")
MODEL_PATH = os.getenv("MLFLOW_MODEL_PATH")

if not all([DATABRICKS_HOST, DATABRICKS_TOKEN, MODEL_PATH]):
    raise ValueError("Missing required environment")

os.environ["MLFLOW_TRACKING_URI"] = MLFLOW_TRACKING_URI
os.environ["DATABRICKS_HOST"] = DATABRICKS_HOST
os.environ["DATABRICKS_TOKEN"] = DATABRICKS_TOKEN

try:
    model = mlflow.sklearn.load_model(MODEL_PATH)
except Exception as e:
    print("Failed to load the model:", e)
    exit()

def predict_survival(person_data):
    try:
        user_df = pd.DataFrame([person_data])
        user_df = pd.get_dummies(user_df, columns=["university"], drop_first=True)
        missing_cols = set(model.feature_names_in_) - set(user_df.columns)
        for col in missing_cols:
            user_df[col] = 0
        user_df = user_df[model.feature_names_in_]
        
        survival_probability = model.predict_proba(user_df)[:, 1][0]
        return survival_probability * 100
    except Exception as e:
        print("Prediction failed:", e)
        return None
