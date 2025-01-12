##Note: This training was done on a databricks notebook, do not run this code separately

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import mlflow
import mlflow.sklearn

df = spark.sql("SELECT * FROM hive_metastore.default.sq_wi_ts_games").toPandas()

df['survives_binary'] = df['survives'].map({'Yes': 1, 'No': 0})

X = pd.get_dummies(df.drop(columns=['survives', 'survives_binary']), columns=['university'], drop_first=True)
y = df['survives_binary']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy}")
print(classification_report(y_test, y_pred))

with mlflow.start_run():
    mlflow.sklearn.log_model(model, "SquidGameSurvivalModel", registered_model_name="SquidGameSurvivalModel")
    mlflow.log_metric("accuracy", accuracy)
    print("Model logged to MLflow!")
