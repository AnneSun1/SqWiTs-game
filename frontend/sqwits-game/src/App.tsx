import { Circle, Triangle, Square } from 'lucide-react'
import dollImage from './assets/doll.png'
import aboutImage from './assets/about.png'
import './App.css'

function App() {
  return (
    <div className="app-container">
      {/* Navigation */}
      <nav className="nav-container">
        <div className="nav-content">
          <div className="nav-logo">
            <Circle className="icon" />
            <Triangle className="icon" />
            <Square className="icon" />
          </div>
          <div className="nav-links">
            <a href="/" className="nav-link">HOME</a>
          </div>
          <div className="nav-spacer" />
        </div>
      </nav>

      {/* Hero Section */}
      <main className="main-container">
        <div className="hero-grid">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-gray">LET THE</span>
              <span className="title-pink">STUDYING BEGIN</span>
            </h1>
            
            <div className="hero-icons">
              <Circle className="hero-icon" />
              <Triangle className="hero-icon" />
              <Square className="hero-icon" />
            </div>

            <button className="start-button">START NOW</button>
          </div>

          <div className="doll-container">
            <img src={dollImage} alt="Game Master Doll" className="doll-image" />
          </div>

        </div>
      </main>


      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-image-container">
            <img src={aboutImage} alt="About" className="about-image" />
          </div>
          <div className="about-text">
            <h2 className="about-title">ABOUT</h2>
            <p className="about-description">
              Study Game is the first productivity app to gamify your learning experience with a unique twist inspired by popular survival games.
            </p>
            <p className="about-description">
              This app distinguishes itself by leveraging AI to create personalized study challenges and track your progress, making every study session an exciting adventure.
            </p>
            <p className="about-description">
              Upon reaching your daily goals, you'll unlock new achievements and rewards, keeping you motivated and engaged in your learning journey.
            </p>
            <p className="about-description">
              Unlike most productivity apps that lack engagement, this project combines proven study techniques with game mechanics. Initially, you'll focus on completing daily challenges, then expand to weekly and monthly goals, making it a unique and dynamic approach to learning.
            </p>
          </div>
        </div>
      </section>

      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-t from-pink-500/20 to-transparent pointer-events-none" />
    </div>
  )
}

export default App
