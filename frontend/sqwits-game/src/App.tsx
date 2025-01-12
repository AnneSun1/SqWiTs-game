import { Circle, Triangle, Square } from 'lucide-react'
import dollImage from './assets/doll.png'
import aboutImage from './assets/about.png'
import './App.css'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import Onboarding from './Onboarding'
import Navbar from './components/Navbar'
import Transition from './Transition'
import Study from './Study'

function App() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <Navbar/>
      
      {/* Hero Section */}
      <main className="main-container">
        <div className="hero-grid">
          <div className="hero-content">
            <img src='/sqwits-game-logo-larger.png'></img>
            <h1 className="hero-title">
              <span className="title-gray text-3xl md:text-4xl">LET THE</span>
              <span className="title-pink text-3xl md:text-4xl">STUDYING BEGIN</span>
            </h1>
            
            <div className="hero-icons">
              <Circle className="hero-icon" />
              <Triangle className="hero-icon" />
              <Square className="hero-icon" />
            </div>

            <button className="start-button" onClick={() => navigate('/onboarding')}>START NOW</button>
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
            Welcome to SQWiTs Game, the ultimate challenge for procrastinators and focus seekers alike.
            </p>
            <p className="about-description">
            Inspired by high-stakes thrillers and infused with humor, SQWiTs Game transforms your productivity struggles into an engaging, game-like experience. With clever consequences, playful roasts, and light-hearted punishments, we’re here to keep you on track and out of distraction’s grasp.
            </p>
            <p className="about-description">
            Your mission: survive the session without breaking the rules. With every distraction, you lose a life.
            </p> 
            <p className="about-description">
            Can you stay focused, or will you face the music—literally? It’s time to put your phone down, sign the contract, and prove you’ve got what it takes to win the SQWiTs Games.
            </p>
            
          </div>
        </div>
      </section>

      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-t from-pink-500/20 to-transparent pointer-events-none" />
    </div>
  )
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/transition" element={<Transition />} />
        <Route path="/study" element={<Study />} />
      </Routes>
    </Router>
  )
}

export default AppWrapper
