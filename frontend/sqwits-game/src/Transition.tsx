'use client'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function StudyTimer() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<'countdown' | 'message' | 'timer'>('countdown')
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutes in seconds
  const [countDown, setCountDown] = useState(3)
  const [lives, setLives] = useState(3)
  
  const startCamera = async () => {
    const response = await axios.post('http://127.0.0.1:5000/start')
    console.log("hi")
    console.log(response.data)
  }

  const handleClick = () => {
    startCamera();
    navigate('/study')
  }
  
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (phase === 'countdown' && countDown > 0) {
      timer = setTimeout(() => {
        setCountDown(prev => prev - 1)
      }, 1000)
    } else if (phase === 'countdown' && countDown === 0) {
      setPhase('message')
      timer = setTimeout(() => {
        setPhase('timer')
      }, 2000)
    } else if (phase === 'timer' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && lives > 0) {
      setLives(prev => prev - 1)
      setTimeLeft(30 * 60)
      setPhase('countdown')
      setCountDown(3)
    }

    return () => clearTimeout(timer)
  }, [phase, countDown, timeLeft, lives])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getBackgroundGradient = (count: number) => {
    switch (count) {
      case 3:
        return 'from-pink-500/20 to-transparent'
      case 2:
        return 'from-[#808080]/20 to-transparent'
      case 1:
        return 'from-[#037a76]/20 to-transparent'
      default:
        return 'from-[#037a76]/20 to-transparent'
    }
  }

  return (
    <div className="app-container">
      <div className="w-full h-screen max-w-4xl mx-auto flex items-center justify-center">
        {/* Main Display */}
        <AnimatePresence mode="wait">
          {phase === 'countdown' && (
            <motion.div
              key="countdown"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="text-[200px] font-bold text-white font-['Orbitron']"
            >
              {countDown}
            </motion.div>
          )}
          {phase === 'message' && (
            <motion.div
              key="message"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="space-y-4 text-center"
            >
              <div className="text-5xl rgb(156, 163, 175); font-Orbitron">
                Study for 30 minutes. Ready?
              </div>
              <button onClick={handleClick} className='px-6 py-3 bg-[#249f9c] hover:bg-[#037a76] rounded-lg font-semibold transition-colors hover:scale-105'>
                LET'S GO
              </button>
            </motion.div>
          )}
          {phase === 'timer' && (
            <motion.div
              key="timer"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-black rounded-lg p-8 shadow-lg shadow-purple-900/20"
            >
              <div className="text-8xl font-mono tracking-widest text-pink-500 font-['Orbitron']">
                {formatTime(timeLeft)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Background Gradient */}
      <div className={`fixed inset-0 bg-gradient-to-t ${getBackgroundGradient(phase === 'countdown' ? countDown : 0)} pointer-events-none`} />
    </div>
  )
}

