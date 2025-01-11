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
    <div className="min-h-screen bg-[#0a0014] flex flex-col items-center pt-20">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-t from-pink-500/20 to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center gap-16">
        {/* Lives Section */}
        <div className="text-center">
          <h2 className="text-white text-2xl mb-4">Lives:</h2>
          <div className="flex gap-6">
            {Array.from({ length: 3 }, (_, i) => (
              <img 
                key={i}
                src={i === 0 ? circleImage : i === 1 ? triangleImage : squareImage} 
                alt="life"
                className={`w-16 h-16 ${i >= lives ? 'opacity-20' : 'opacity-100'}`}
              />
            ))}
          </div>
        </div>

        {/* Title */}
        <h1 className="hero-title text-center">
          <span className="title-gray block text-5xl">TIME TO</span>
          <span className="title-pink block text-5xl">STUDY</span>
        </h1>

        {/* Timer Display */}
        <div className="bg-[#1a0028]/50 rounded-xl p-8 shadow-lg shadow-purple-900/20 backdrop-blur-sm border border-pink-500/20">
          <div className="text-8xl font-mono tracking-wider bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>
    </div>
  )
}
