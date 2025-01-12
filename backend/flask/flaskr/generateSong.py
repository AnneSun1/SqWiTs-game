import os
import requests
from dotenv import load_dotenv
from openai import OpenAI
import replicate
import dropbox

load_dotenv()

def upload_dropbox(file_url, dropbox_path):
    dbx = dropbox.Dropbox(os.getenv('DROPBOX_ACCESS_TOKEN'))

    try:
        response = requests.get(file_url, stream=True)
        response.raise_for_status()  # raises error for HTTP issues
        
        # Always overwrite the existing file
        dbx.files_upload(
            response.content, 
            dropbox_path, 
            mode=dropbox.files.WriteMode.overwrite
        )
        print(f"File from '{file_url}' uploaded to '{dropbox_path}' in Dropbox.")
        return dropbox_path
    except Exception as e:
        print(f"Error uploading file to Dropbox: {e}")
        return None



def get_direct_dropbox_url(sharing_url):
    # sharing URL to direct download URL
    return sharing_url.replace('?dl=0', '?dl=1')



def generate_song(lyrics):
    # Your Dropbox sharing link here
    sharing_url = os.getenv('REFERENCE_SONG_URL')
    direct_url = get_direct_dropbox_url(sharing_url)
    
    input = {
        "lyrics": lyrics,
        "song_file": direct_url
    }
    output = replicate.run(
        "minimax/music-01",
        input=input
    )
    
    print(output)
    dropbox_destination = os.environ.get("DESTINATION_SONG_URL")
    upload_dropbox(output, dropbox_destination)
    return True

def generate_lyrics(name, subject):
    client = OpenAI(
        api_key=os.environ.get("OPENAI_API_KEY")
    )

    messages = [
        {
            "role": "system",
            "content": (
                "You are a witty songwriter who creates funny, light-hearted songs about students "
                "participating in Study Squid Games, a productivity competition. Each song must be exactly 4-5 lines, "
                "with each line terminated by \\n. The lines should rhyme and be singable. "
                "Keep the tone playful, not mean."
            ),
        },
        {
            "role": "user",
            "content": (
                f"Write a song about {name}, who should be studying {subject} "
                f"but is probably procrastinating instead. Make references to their field. "
                f"Include references to them competing in Study Squid Games - they might lose points, "
                f"get eliminated, or face challenges in the competition due to their procrastination. "
                f"Format example: 'Line one goes here\\nLine two goes here\\n' etc. "
                f"Exactly 4-5 lines total."
            ),
        },
    ]


    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        max_tokens=300,
        temperature=0.8
    )

    return response.choices[0].message.content.strip()


def generate_and_upload_song(name, subject):
    lyrics = generate_lyrics(name, subject)
    #print(lyrics)
    generate_song(lyrics)


if __name__ == '__main__':
    generate_and_upload_song("Dan", "Business")
    
