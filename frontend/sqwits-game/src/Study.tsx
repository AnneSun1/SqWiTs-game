import { useState, useEffect } from 'react'

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
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isRunning, timeLeft])

  return (
    <div className="min-h-screen bg-[#0a0014] text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto text-center space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold tracking-wider bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            STUDY NOW
          </h1>
          {/* Lives Display */}
          <div className="flex justify-center gap-4">
            {Array.from({ length: lives }, (_, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-pink-500"></div>
            ))}
          </div>
        </div>

        {/* Timer Display */}
        <div className="bg-[#1a0028] rounded-lg p-8 shadow-lg shadow-purple-900/20">
          <div className="text-8xl font-mono tracking-widest text-pink-500">{formatTime(timeLeft)}</div>
        </div>

        {/* Decorative Shapes */}
        <div className="flex justify-center gap-8 opacity-20">
          <div className="w-12 h-12 rounded-full border-4 border-pink-500"></div>
          <div className="w-12 h-12 rotate-45 border-4 border-pink-500"></div>
          <div className="w-12 h-12 border-4 border-pink-500"></div>
        </div>
      </div>
    </div>
  )
}
