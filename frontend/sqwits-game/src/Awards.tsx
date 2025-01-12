import Navbar from './components/Navbar'
import treeImage from './assets/tree.png'
import yayImage from './assets/yay.png'
import yearImage from './assets/year.png'
import playerImage from './assets/player.png'

export default function Awards() {
  return (
    <div className="app-container">
      <Navbar />
      
      <div className="relative z-10 flex gap-8 w-full max-w-7xl mx-auto px-4 py-24">
        {/* Study Hours Box */}
        <div className="bg-[#2A2A2A]/50 rounded-xl p-8 shadow-lg shadow-green-900/20 backdrop-blur-sm border border-green-500/20 w-1/3">
          <h2 className="text-white text-3xl mb-6 font-['Orbitron']">Total Study Time</h2>
          <div className="text-6xl font-mono tracking-wider text-white text-center">
            30:22
          </div>
          <div className="text-xl text-white/80 text-center mt-2 font-['Orbitron']">
            HOURS : MINUTES
          </div>
          <div className="flex justify-center mt-4">
            <img src={playerImage} alt="Player" className="w-50 h-60" />
          </div>
        </div>

        {/* Awards Section */}
        <div className="flex flex-col gap-6 w-2/3">
          {/* Earned Awards */}
          <div className="bg-[#2A2A2A]/50 rounded-xl p-8 shadow-lg shadow-green-900/20 backdrop-blur-sm border border-green-500/20">
            <h2 className="text-white text-3xl mb-6 font-['Orbitron']">Awards Earned</h2>
            <div className="flex flex-col items-center gap-6">
              <div className="text-center">
                <img src={treeImage} alt="Eco Day" className="w-32 h-32 mb-4" />
                <h3 className="text-white text-xl font-['Orbitron'] mb-2">Eco Day</h3>
                <p className="text-white/80">Study for 1 hour on earth day.</p>
              </div>
            </div>
          </div>

          {/* Available Awards */}
          <div className="bg-[#2A2A2A]/50 rounded-xl p-8 shadow-lg shadow-green-900/20 backdrop-blur-sm border border-green-500/20">
            <h2 className="text-white text-3xl mb-6 font-['Orbitron']">Awards You Can Get</h2>
            <div className="flex flex-col items-center gap-6">
              <div className="text-center">
                <img src={yayImage} alt="January Challenge" className="w-32 h-32 mb-4" />
                <h3 className="text-white text-xl font-['Orbitron'] mb-2">January Challenge</h3>
                <p className="text-white/80">Have 3 study sessions in the month of January.</p>
              </div>
              <div className="text-center">
                <img src={yearImage} alt="New Year" className="w-32 h-32 mb-4" />
                <h3 className="text-white text-xl font-['Orbitron'] mb-2">Kick off the New Year</h3>
                <p className="text-white/80">Start of 2025 off strong by studying for 30 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="background-gradient" style={{ background: 'linear-gradient(to bottom, rgba(236, 72, 153, 0.8), rgba(0, 0, 0, 0.8))' }} />
    </div>
  )
} 