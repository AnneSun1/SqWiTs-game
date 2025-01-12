import { useState, useEffect } from 'react'
import circleImage from './assets/circle.png'
import squareImage from './assets/square.png'
import triangleImage from './assets/triangle.png'

function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

export default function StudyTimer() {
  const [timeLeft, setTimeLeft] = useState(30 * 60)
  const [isRunning, setIsRunning] = useState(true)
  const [lives, setLives] = useState(3)

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    }
    return () => clearInterval(intervalId)
  }, [isRunning, timeLeft])

  return (
    <div className="app-container">
      <div className="relative z-10 flex flex-col items-center gap-24 w-full max-w-7xl mx-auto px-4 py-24">
        {/* Lives Section */}
        <div className="text-center">
          <h2 className="text-white text-3xl mb-6 font-['Orbitron']">Lives:</h2>
          <div className="flex gap-8">
            {Array.from({ length: 3 }, (_, i) => (
              <img 
                key={i}
                src={i === 0 ? circleImage : i === 1 ? triangleImage : squareImage} 
                alt="life"
                className={`w-24 h-24 ${i >= lives ? 'opacity-20' : 'opacity-100'}`}
              />
            ))}
          </div>
        </div>

        {/* Title */}
        <h1 className="hero-title text-center">
          <span className="title-white block text-7xl">STUDY</span>
        </h1>

        {/* Timer Display */}
        <div className="flex gap-4">
          <div className="bg-[#2A2A2A]/50 rounded-xl p-8 shadow-lg shadow-green-900/20 backdrop-blur-sm border border-green-500/20 flex flex-col items-center justify-center min-w-[200px] min-h-[200px]">
            <div className="text-6xl font-mono tracking-wider text-white">
              {Math.floor(timeLeft / 60).toString().padStart(2, '0')}
            </div>
            <div className="text-xl text-white/80 text-center mt-2 font-['Orbitron']">
              MINUTES
            </div>
          </div>
          
          <div className="bg-[#2A2A2A]/50 rounded-xl p-8 shadow-lg shadow-green-900/20 backdrop-blur-sm border border-green-500/20 flex flex-col items-center justify-center min-w-[200px] min-h-[200px]">
            <div className="text-6xl font-mono tracking-wider text-white">
              {(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <div className="text-xl text-white/80 text-center mt-2 font-['Orbitron']">
              SECONDS
            </div>
          </div>
        </div>
      </div>
      
      {/* Add the background gradient */}
      <div className="background-gradient" style={{ background: 'linear-gradient(to bottom, #000000 80%, rgba(3, 122, 118, 0.5)' }} />

    </div>
  )
}
