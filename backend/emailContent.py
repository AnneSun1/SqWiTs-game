import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY")
)

def generate_email_content(recipient, name):
    messages = [
        {
            "role": "system",
            "content": (
                "Based on the recipients role, write them a one sentence embarassing email from the name. on how I checked"
                "Make it squid game themed.  If you are my crush, make it a pick up line. Do not use their name."
            ),
        },
        {
            "role": "user",
            "content": f"Write a cringey email to my {recipient}. This email is from {name}. Make it short and embarassing.",
        },
    ]

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        max_tokens=300,
        temperature=0.8
    )

    return response.choices[0].message.content.strip()

recipient = input("Who is the email for (crush, mom, professor)? ").strip().lower()

name=input("Whats your name: ").strip().lower()

email_content = generate_email_content(recipient, name)

print(email_content)
