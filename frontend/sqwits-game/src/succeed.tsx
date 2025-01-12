import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import money from './assets/money.png';

const Succeed = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-black to-green-950"
    >
      <div className="text-center max-w-2xl mx-auto font-Orbitron">
        <img 
          src={money} 
          alt="Money Reward" 
          className="w-40 h-40 mx-auto mb-6"
        />

        <h1 className="text-6xl font-bold mb-8 text-green-100 font-display font-['Orbitron']">
          STUDY COMPLETE
        </h1>
         
        <div className="space-y-6 text-green-100 font-body text-xl font-Orbitron">
          <p>
            While other players fell to their distractions, 
            you survived the study session.
          </p>
          <p>
            You've cleared some study debt!
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-12 px-8 py-3 bg-green-700 hover:bg-green-600 text-white rounded-lg 
                     font-semibold transition-colors duration-200 shadow-lg"
        >
          STUDY AGAIN
        </button>
      </div>
    </motion.div>
  );
};

export default Succeed; 