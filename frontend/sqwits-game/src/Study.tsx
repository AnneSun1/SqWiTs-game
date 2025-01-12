import { useState, useEffect } from 'react'
import circleImage from './assets/circle.png'
import squareImage from './assets/square.png'
import triangleImage from './assets/triangle.png'
import guardcircle from './assets/guardcircle.png'
import guardsquare from './assets/guardsquare.png'
import chatImage from './assets/chat.png'
import { useSocket } from './SocketContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// function formatTime(time: number) {
//   const minutes = Math.floor(time / 60)
//   const seconds = time % 60
//   return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
// }

export default function StudyTimer() {
  const [timeLeft, setTimeLeft] = useState(30)
  const [isRunning, setIsRunning] = useState(true)
  const [lives, setLives] = useState(3)
  // const [isChatActive, setIsChatActive] = useState(false)
  const [isChatVisible, setIsChatVisible] = useState(false)
  const [survivalProbability, setSurvivalProbability] = useState('...')
  const navigate = useNavigate()
  useEffect(() => {
    
    let intervalId: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    }

    if (timeLeft === 0) {
      setIsRunning(false)
      navigate('/succeed')
    }
    
    if (lives === 0) {
      setIsRunning(false)
      navigate('/fail')
    }

    return () => clearInterval(intervalId)
  }, [isRunning, timeLeft, lives])



  // WEBSOCKET STUFF ----------------------------
  const { socket } = useSocket(); 

  useEffect(() => {
    if (!socket) return;

    socket.on('song-generated', (data: { message: string }) => {
      console.log('Song played:', data.message);
      setLives((lives) => lives - 1);
      console.log(lives)

    });

    socket.on('get-people', (data: {message: string}) => {
      console.log('People detected:', data.message)
      setLives((lives => lives - 1));
      console.log(lives)
    } )

    socket.on('send-email', (data: {message: string}) => {
      console.log('Send Email:', data.message)
      setLives((lives) => lives -1);
      console.log(lives)
    } )

    // return () => {
    //   socket.off('phone_detected');
    // };
  }, [socket, lives]);


  // WEBSOCKET STUFF -------------------------------------

  useEffect(() => {
    const getData = async () => {
      const response = await axios.post('http://127.0.0.1:5051/predict-survival');
      setSurvivalProbability(response.data.probability)
    }

    getData();
  })
  
  




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

        {/* Guards and Text Box Section */}
        <div className="flex items-center justify-center gap-8 mt-16">
          <img 
            src={guardcircle} 
            alt="Guard Circle" 
            className="w-28 h-28"
          />
          
          <div className="bg-[#037a76]/20 rounded-xl p-8 shadow-lg shadow-green-900/20 backdrop-blur-sm border border-green-500/20 max-w-md">
            <p className="text-white/80 text-center font-['Orbitron']">
              Stay focused and maintain your study streak!
            </p>
          </div>

          <img 
            src={guardsquare} 
            alt="Guard Square" 
            className="w-28 h-28"
          />
        </div>
      </div>
      
      {/* Add the background gradient */}
      <div className="background-gradient" style={{ background: 'linear-gradient(to bottom, #000000 80%, rgba(3, 122, 118, 0.5)' }} />

      {/* Probability of Surviving Section */}
      <div className="fixed bottom-8 right-8 bg-white p-4 rounded-lg shadow-lg border border-[#249f9c] bg-opacity-10">
        <h2 className="text-white text-5xl font-normal text-center font-mono">
          {survivalProbability}%
        </h2>
        <p className="text-white text-center font-['Orbitron']">SURVIVAL PROBABILITY</p>
      </div>

      {/* Chat Button */}
      <button 
        className="fixed bottom-8 left-8 bg-[#249f9c] hover:bg-[#037a76] text-white font-['Orbitron'] 
                   px-6 py-3 rounded-full shadow-lg transition-all duration-300 
                   flex items-center gap-2 z-50"
        onClick={() => {
          setIsChatVisible((prev) => !prev)
          console.log(isChatVisible ? 'Stop button clicked' : 'Chat button clicked')
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
          />
        </svg>
        {isChatVisible ? 'Stop' : 'Chat with me'}
      </button>

      {/* Chat Image Popup */}
      {isChatVisible && (
        <div className="fixed bottom-20 left-8 z-50">
          <img 
            src={chatImage} 
            alt="Chat" 
            className="w-40 h-32.5" 
            style={{ paddingBottom: '30px' }}
          />
        </div>
      )}
    </div>
  )
}
