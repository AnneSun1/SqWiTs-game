import { Circle, Triangle, Square } from 'lucide-react'
import dollImage from './assets/doll.png'
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
            <a href="/timer" className="nav-link">TIMER</a>
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
            <img
              src={dollImage}
              alt="Game Master Doll"
              className="doll-image"
            />
          </div>
        </div>
      </main>

      {/* Background Gradient */}
      <div className="background-gradient" />
    </div>
  )
}

export default App
