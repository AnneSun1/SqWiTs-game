import os
from openai import OpenAI
from dotenv import load_dotenv
import pyttsx3
import speech_recognition as sr
import keyboard 

load_dotenv()

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY")
)

engine = pyttsx3.init()
engine.setProperty("rate", 200) 
engine.setProperty("voice", engine.getProperty("voices")[0].id) 


def recognize_speech():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening... Speak now.")
        try:
            audio = recognizer.listen(source, timeout=5) 
            print("Processing your input...")
            return recognizer.recognize_google(audio)
        except sr.WaitTimeoutError:
            print("No input detected. Please try again.")
            return None
        except sr.UnknownValueError:
            print("Sorry, I couldn't understand. Please try again.")
            return None


def speak(text):
    engine.say(text)
    engine.runAndWait()


def generate_ai_response(user_input):
    messages = [
        {"role": "system", "content": (
            "You are a Squid Game guard. You are insanely mean. Keep your answers short."
        )},
        {"role": "user", "content": user_input},
    ]

    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            max_tokens=150,
            temperature=0.7,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error: {e}")
        return "Sorry, I couldn't process that. Please try again."


def chat_with_ai():
    print("Squid Game Guard AI (say 'exit' to quit)\n")
    speak("What do you want, player?")

    while True:
        user_input = recognize_speech()
        if not user_input:
            continue

        if user_input.lower() == "exit":
            print("Exiting chat. Goodbye!")
            speak("Exiting chat. Goodbye.")
            break

        print(f"You: {user_input}")

        ai_reply = generate_ai_response(user_input)

        print(f"Guard: {ai_reply}")

        speak(ai_reply)


if __name__ == "__main__":
    print("Press 't' to start chatting with the Squid Game Guard.")
    while True:
        if keyboard.is_pressed('t'): 
            print("Starting conversation...")
            chat_with_ai()
            break
