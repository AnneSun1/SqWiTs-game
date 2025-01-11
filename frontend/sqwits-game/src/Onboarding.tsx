import { Circle, Triangle, Square } from 'lucide-react'
import { useState } from 'react'
import Navbar from './components/Navbar'
// import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem, RadioGroupIndicator } from '@radix-ui/react-radio-group'
import { Label } from '@radix-ui/react-label'
import { useNavigate } from 'react-router-dom'

function Onboarding() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    studySubject: '',
    funFact: '',
    email: '',
    relation: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    navigate('/transition')
  };

  const [MultichoiceAnswers, setMultichoiceAnswers] = useState<{ [key: number]: string }>({})

  const handleMultichoiceAnswerChange = (questionId: number, answer: string) => {
    setMultichoiceAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleMultichoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted answers:', MultichoiceAnswers)
    // Here you would typically send the answers to a server
    alert('Form submitted! Check console for answers.')
  }

  return (
    <div className="app-container">
      <Navbar/>

      <main className="main-container">
        <div className="onboarding-container max-w-2xl mx-auto p-8">
          <h1 className="text-4xl font-bold mb-8 text-center">
            <span className="title-gray font-['Orbitron']">WELCOME TO THE</span>
            <span className="title-pink font-['Orbitron']">GAME</span>
            <br/>
            <p className="text-sm font-thin font-['Orbitron']">Before we begin, read over this contract:</p>
          </h1>

          {/* <form onSubmit={handleSubmit} className="space-y-6"> */}
          <div className="space-y-6">
            <div className="form-group">
              <label htmlFor="studySubject" className="block text-lg mb-2">What are you studying right now?</label>
              <input
                type="text"
                id="studySubject"
                className="w-full p-3 rounded-lg bg-white/10 border border-pink-500/30 text-white"
                value={formData.studySubject}
                onChange={(e) => setFormData({...formData, studySubject: e.target.value})}
                required
              />
            </div>

            <div className="form-group Orbitron">
              <label htmlFor="funFact" className="block text-lg mb-2">Tell us a fun fact about you</label>
              <input
                type="text"
                id="funFact"
                className="w-full p-3 rounded-lg bg-white/10 border border-pink-500/30 text-white"
                value={formData.funFact}
                onChange={(e) => setFormData({...formData, funFact: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="block text-lg mb-2">What's the email of someone you do not want to email?</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded-lg bg-white/10 border border-pink-500/30 text-white"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="relation" className="block text-lg mb-2">What's their relation to you?</label>
              <select
                id="relation"
                className="w-full p-3 rounded-lg bg-white/10 border border-pink-500/30 text-white"
                value={formData.relation}
                onChange={(e) => setFormData({...formData, relation: e.target.value})}
                required
              >
                <option value="">Select an option</option>
                <option value="boss">Boss</option>
                <option value="teacher">Teacher</option>
                <option value="crush">Crush</option>
                <option value="enemy">Enemy</option>
                <option value="ex">Ex</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="name" className="block text-lg mb-2 font-['Orbitron']">Sign your name</label>
              <input
                type="text"
                id="name"
                className="w-full p-3 rounded-lg bg-white/10 border border-pink-500/30 text-white"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div>
              <form onSubmit={handleMultichoiceSubmit} className="max-w-md mx-auto mt-8 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Do you consent to playing these games?</h2>
                  <RadioGroup defaultValue="hi">
                  {/* //   onValueChange={(value) => handleMultichoiceAnswerChange(0, value)}
                  //   value={MultichoiceAnswers[0] || ''} */}
                
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem style={{
                          backgroundColor: 'white',
                          width: '25px',
                          height: '25px',
                          borderRadius: '100%',
                          boxShadow: '0 2px 10px var(--black-a7)',
                        }} value='Yes'>
                          <RadioGroupIndicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-blue-500" />
                        </RadioGroupItem>
                        <Label >Yes</Label>
                        
                      </div>
                  </RadioGroup>
                </div>
              </form>
            </div>

            <button 
              onClick={handleSubmit} 
              type="submit" 
              className="start-button w-full font-[Orbitron']"
            >
              CONTINUE
            </button>
          {/* </form> */}
          </div>
        </div>
      </main>

      <div className="fixed inset-0 bg-gradient-to-t from-pink-500/20 to-transparent pointer-events-none" />
    </div>
  );
}

export default Onboarding; 