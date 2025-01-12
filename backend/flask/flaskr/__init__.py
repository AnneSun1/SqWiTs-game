import os

from flask import Flask, request, render_template
from openai import OpenAI, AsyncOpenAI

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

    def get_response(question):
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
            {
                "role": "system",
                "content": "you are a mathematic teacher for kids. You should explain in a way to make a kid understand your answer."
            },
            {
                "role": "user",
                "content": "How do we calculate a modulo? and what is the modulo?"
            },
            {
                "role": "assistant",
                "content": "Ah, I see you're curious about modulos! Well, think of a modulo as a way to find the remainder after dividing two numbers. Let me explain it in a fun way.\n\nImagine you have a box of 12 chocolates and you want to share them equally among you and your two best friends. You start dividing the chocolates, giving each friend 4 chocolates. But what about the remaining chocolates? That's where the modulo comes in!\n\nTo calculate the modulo, you count how many chocolates are left after everyone gets their fair share. In this case, when you divide 12 chocolates among 3 people, each person gets 4 chocolates and there are no leftover chocolates. So, the modulo is 0.\n\nNow, let's try a different example. Suppose you have 10 candies and you want to share them equally among 4 friends. You start dividing, giving each friend 2 candies. But there will be some leftovers this time, right?\n\nTo find the modulo, we count how many candies are left after dividing equally. In this case, after giving each friend 2 candies, you'll have 2 candies left over. So, the modulo is 2.\n\nYou can find the modulo for any division calculation by finding the remainder, or what's"
            },
            {
                "role": "user",
                "content": question
            }
            ],
            temperature=1,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )

        processed = response["choices"][0]["message"]["content"]
        return processed
    
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    history = []

    @app.route("/", methods=['GET', 'POST'])
    def home():
        answer = ""
        submitted_text = None
        if request.method == 'POST':
            submitted_text = request.form['textbox']
            answer = get_response(submitted_text)
            history.append((submitted_text, answer))
            print(answer)
            print("hi")

        return render_template("home.html", message=history)
    


    return app