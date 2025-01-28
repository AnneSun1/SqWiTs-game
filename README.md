# Sqwits Game (3rd @ SheHacks 9 and Best use of Databricks)
Inspiration 🎯

Shakily I’VE PLAYED THESE GAMES BEFORE! I SAID I’VE PLAYED THESE GAMES BEFORE!

144—that's 144 times every day you reach for your phone, open it, and do something, anything. You're only awake 16 hours a day, and the average person spends nearly 5 hours looking at their phone.

With the release of Squid Game Season 2, we drew inspiration from the high-stakes intensity of the series to tackle a modern challenge: phone addiction. Our goal? To create something equally engaging that encourages students to stay focused on their studies. And so, SqWiTS Game was born—a quirky, interactive app designed to keep you on track by punishing you in themed ways whenever you go on your phone, incentivizing you to study more than your friends, and providing predictive capabilities on your performance.

What it Does 📱✨

Tracks if you’re distracted during a study session using your webcam.
Punishes distractions with escalating tasks:

Roast Rap: AI generates a roast song with lyrics specifically tailored to you.
Webcam People Challenge: Like the Squid Game Mingle Game, you must awkwardly ask people to find 4 individuals to join your frame within 10 seconds.

Embarrassing Email Scare: Sends an embarrassing email to people you know such as your crush, mom, boss, etc.
Tracks your study hours and awards you badges for consistency and focus, just like an Apple Watch in Apple Fitness.
Compares your performance to other players from past years.
How We Built It 🛠️

Frontend:
Designed prototypes with Figma and used Procreate to hand-draw Squid Game assets (e.g., the guards).
Built using React and Vite with TypeScript for seamless UI interactions.
Styled with TailwindCSS and Custom CSS animations for modern, responsive design.
Real-time communication powered by WebSockets (Socket.io).

Backend:
Developed with Python.
Integrated OpenCV & YOLOv5 for webcam monitoring, distraction detection, and verifying task completion.
Used OpenAI, Dropbox, and Minimax APIs for generating roasts in the form of emails and songs.
Databricks tracks productivity based on historical data collected from thousands of "last year's players," generated via a Python script with fields like university, age, number of exams, and GPA.
Loaded the dataset into Databricks Hive Metastore and accessed it using Spark SQL queries.
Used 80% of the data for training, 20% for testing.
Trained a Random Forest model on a Databricks cluster.
Logged the model using MLflow.
Python libraries like Pandas, pyttsx3, and speech_recognition enhance data formatting and audio tasks.
Emails sent via an SMTP server from a custom email account.
Used Postman for testing custom POST and GET requests between processes.
Integrated into the frontend via Flask (with WebSocket and multithreading to handle concurrent processes).

What’s Next for SQWiTS Game 🚀

Gamify Further:
Earn coins after each study session to buy different Squid Game characters (e.g., characters with aviators).

Leaderboard Expansion:
Allow users to compete with friends or globally for focus streaks and study hours.

Enhanced AI Models:
Improve webcam detection accuracy using more robust ML techniques.

Mobile Integration:
Expand to mobile platforms for broader accessibility.

Social Features:
Enable study groups and shared leaderboards to motivate users through collaboration.

Data Collection:
Store datasets on Azure Data Lake Storage (ADLS) and experiment with alternative models/training to improve accuracy

# Sqwits Game Setup

## Backend Setup (from root)

1. **Create the virtual environment:**

   ```bash
   python -m venv sqwits-game-venv
   ```

2. **Activate the virtual environment:**

   - On Windows:
     ```bash
     sqwits-game-venv\Scripts\activate
     ```
   - On Mac/Linux:
     ```bash
     source sqwits-game-venv/bin/activate
     ```

3. **Install the dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask app:**
   ```bash
   flask --app flaskr run
   ```

---

## Frontend Setup (from `frontend/sqwits-game`)

1. **Install Vite:**

   ```bash
   npm i vite
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## Notes

- Make sure you have Python, Node.js, and npm installed before starting.
- Run the Flask and Vite servers in separate terminals.
