import os
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

from openai import OpenAI, AsyncOpenAI
from dotenv import load_dotenv
from email.message import EmailMessage
import subprocess
import smtplib
# from . import mergedOpenCV
# from .databricksModelCall import predict_survival
from threading import Thread
from flask_socketio import SocketIO

load_dotenv()

email_data = None

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY")
)

def generate_email_content(recipient, name):
    messages = [
        {
            "role": "system",
            "content": (
                "Based on the recipients role, write them a one sentence embarassing email from the name. on how I checked"
                "Make it squid game themed.  If you are my crush, make it a pick up line. Do not address them at the start."
            ),
        },
        {
            "role": "user",
            "content": "Write a cringey email to my {recipient}. This email is from {name}. Make it short and embarassing.",
        },
    ]

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        max_tokens=300,
        temperature=0.8
    )

    return response.choices[0].message.content.strip()



def send_email(recipient, subject, body):
    try:
        msg = EmailMessage()
        msg['From'] = os.environ.get('MAIL_USERNAME')
        msg['To'] = recipient
        msg['Subject'] = subject
        msg.set_content(body)

        # connect to SMTP server
        server = smtplib.SMTP(os.environ.get('MAIL_SERVER'), int(os.environ.get('MAIL_PORT', 587)))
        server.starttls()
        server.login(os.environ.get('MAIL_USERNAME'), os.environ.get('MAIL_PASSWORD'))
        
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False
    

def generate_and_send_email(recipient_email, recipient_type, name):
    email_subject = "An Important Message From " + name
    email_body = generate_email_content(recipient_type, name)
    email_body += "\nLove, " + name
    if send_email(recipient_email, email_subject, email_body):
        print("Email sent successfully")
        return True
    else:
        print("Failed to send email")
        return False



def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    socketio = SocketIO(app, 
        cors_allowed_origins="*",
        # ping_timeout=60000,
        # ping_interval=25000,
        async_mode='threading'
    )
    socketio.init_app(app, cors_allowed_origins="http://localhost:5173")
    # app.config['CORS_HEADERS'] = 'Content-Type'

    

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    def monitor_process():
        process = subprocess.Popen(
            ["python3", "./flaskr/mergedOpenCV.py"],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

    @app.route("/start", methods=['GET', 'POST'])
    @cross_origin()
    def start():
        if request.method == 'GET':
            print("Subprocess starts soon")
            subprocess_thread = Thread(target=monitor_process)
            subprocess_thread.daemon = True
            subprocess_thread.start()

        return jsonify({"status": "started", "message": "Subprocess started in background"}), 200
    
    @app.route("/submit-email-data", methods=['POST'])
    def submit():
        global email_data
        data = request.get_json()
        email_data = data
        name = data.get('name')
    
        email=data.get('email')
        fun_fact = data.get('funFact')
        recipient = data.get('recipient')
        study_subject=data.get('studySubject')

        print(email_data)
        return jsonify({"status": "success", "message": "Email sent", "data": data}), 200

    @app.route("/send-email", methods=['POST'])
    @cross_origin()
    def send():
        global email_data
        socketio.emit('send-email', {'message': '-1 life, the email is sent'})
        if generate_and_send_email(email_data['email'], email_data['recipient'], email_data['name']):
            # return jsonify({"status": "success", "message": "Email sent", "data": data}), 200
            return("Email sent")
            

        return ("No email sent")
    

    @app.route("/play-song", methods=['POST']) 
    def subtract():
        socketio.emit('play-song', {'message': '-1 life, the song is played'})
        return("Song is played")

    @app.route("/get-people", methods=['POST']) 
    def people():
        socketio.emit('get-people', {'message': '-1 life, get four people'})
        return("Get Four People")

         
    @app.route("/", methods=['POST'])
    @cross_origin()
    def main():
        return("Welcome")

    
    @app.route("/predict-survival", methods=['POST'])
    def get_survival_prediction():
        try:
            data = request.get_json()
            
            # Extract data from request
            person_data = {
                "age": 23,  # You can make this dynamic later
                "university": "University of Waterloo",  # You can make this dynamic later
                "exams_count": int(data.get('examsCount', 5)),
                "gpa": float(data.get('gpa', 3.8))
            }
            
            probability = predict_survival(person_data)
            return jsonify({
                "status": "success",
                "probability": probability
            }), 200
        except Exception as e:
            return jsonify({
                "status": "error",
                "message": str(e)
            }), 400
    
    return app