import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import lose from './assets/lose.png';

const Fail = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-black to-red-950"
    >
      <div className="text-center max-w-2xl mx-auto font-Orbitron">
        <img 
          src={lose} 
          alt="Money Debt" 
          className="w-32 h-40 mx-auto mb-6"
        />

        <h1 className="text-6xl font-bold mb-8 text-red-100 font-display font-['Orbitron']">
         YOU FAILED
        </h1>
         
        <div className="space-y-6 text-red-100 font-body text-xl font-Orbitron">
          <p>
            You picked up your phone <span className="font-bold bg-red-900">3 times</span> and
            failed this session.
          </p>
          <p>
            You've just added{" "}
            <span className="font-bold bg-red-900">1 million points</span> of study debt to
            the remaining focused players.
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-12 px-8 py-3 bg-red-700 hover:bg-red-600 text-white rounded-lg 
                     font-semibold transition-colors duration-200 shadow-lg"
        >
          TRY AGAIN
        </button>
      </div>
    </motion.div>
  );
};

export default Fail;
