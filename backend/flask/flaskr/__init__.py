import os
from openai import OpenAI, AsyncOpenAI
from dotenv import load_dotenv

from flask import Flask, request, jsonify
from sendEmail import generate_and_send_email


load_dotenv()

client = OpenAI(
  api_key=os.environ['OPENAI_API_KEY'],  # this is also the default, it can be omitted
)

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )
    
    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass


    @app.route("/send-email", methods=['POST'])
    def home():
        data = request.get_json()

        name = data.get('name')
        email=data.get('email')
        fun_fact = data.get('funFact')
        recipient = data.get('recipient')
        study_subject=data.get('studySubject')

        print(f"{name}, {email}, {recipient}")

        if generate_and_send_email(email, recipient, name):
            return jsonify({"status": "success", "message": "Email sent", "data": data}), 200

        return jsonify({"status": "failure", "message": "Email sent", "data": data}), 400

    @app.route("/", methods=['GET'])
    def main():
        return("Welcome")
    
    return app