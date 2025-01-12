import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { useNavigate } from 'react-router-dom'
import { RadioGroup, RadioGroupItem, RadioGroupIndicator } from '@radix-ui/react-radio-group'
import axios from 'axios'

function Onboarding() {
  const navigate = useNavigate()
  const [isFormComplete, setIsFormComplete] = useState(false)
  const [hasConsent, setHasConsent] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    studySubject: '',
    funFact: '',
    email: '',
    recipient: ''
  });

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((value) => (value !== '')); 
    if (allFieldsFilled && hasConsent) {
      setIsFormComplete(allFieldsFilled)
    }

  }, [formData, hasConsent])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    uploadData();
    navigate('/transition')
  };

  const handleConsentChange = (value: string) => {
    if (value === 'yes') {
      setHasConsent(true)
    } else {
      setHasConsent(false)
    }
  }

  const uploadData = async () => {
    const response = await axios.post('http://127.0.0.1:5000/send_email', formData)
    console.log(response.data)
  }

  return (
    <div className="app-container">
      <Navbar/>

      <main className="main-container">
        <div className="onboarding-container max-w-2xl mx-auto p-8">
          <h1 className="text-4xl font-bold mb-8 text-center font-['Orbitron']">
            <span className="title-gray">WELCOME TO THE</span>
            <span className="title-pink">SQWiTs GAMES</span>
            <br/>
            <p className="text-xl">Before we begin, read over this contract:</p>
          </h1>
      
          <h2 className="text-xl font-bold mb-8 font-['Orbitron']">
            Clause 1: 
            <p className="text-sm font-thin mb-[10px]">A player is not allowed to stop playing</p>
            Clause 2:
            <p className="text-sm font-thin mb-[10px]">A player is not allowed to touch their phone during the duration of the game</p>
          </h2>


          {/* <form onSubmit={handleSubmit} className="space-y-6"> */}
          <div className="space-y-6">
            <div className="form-group">
              <label htmlFor="studySubject" className="block text-lg mb-2 font-['Orbitron']">What are you studying right now?</label>
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
              <label htmlFor="funFact" className="block text-lg mb-2 font-['Orbitron']">Tell us a fun fact about you</label>
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
              <label htmlFor="email" className="block text-lg mb-2 font-['Orbitron']">What's the email of someone you do not want to email?</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded-lg bg-white/10 border border-pink-500/30 text-white"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className='form-group'>
              <form className="max-w-md mt-8 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-thin font-['Orbitron']">What is their relation to you?</h2>
                  
                  <RadioGroup defaultValue="" onValueChange={(value) => setFormData({...formData, recipient: value})}>
                    <div className="flex items-center space-x-2 ">
              
                        <RadioGroupItem className="bg-white rounded-full w-[25px] h-[25px] mt-[2px] mb-[2px]" value='boss' id='boss'>
                            <RadioGroupIndicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-3 after:h-3 after:rounded-full after:bg-black" />
                        </RadioGroupItem>
                        <label className="font-['Orbitron']" htmlFor='boss'>Boss</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem className="bg-white rounded-full w-[25px] h-[25px] mt-[2px] mb-[2px]" value='teacher' id='teacher'>
                          <RadioGroupIndicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-3 after:h-3 after:rounded-full after:bg-black" />
                        </RadioGroupItem>
                        <label className="font-['Orbitron']" htmlFor='teacher'>Teacher</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem className="bg-white rounded-full w-[25px] h-[25px] mt-[2px] mb-[2px]" value='crush' id='crush'>
                          <RadioGroupIndicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-3 after:h-3 after:rounded-full after:bg-black" />
                        </RadioGroupItem>
                        <label className="font-['Orbitron']" htmlFor='crush'>Crush</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem className="bg-white rounded-full w-[25px] h-[25px] mt-[2px] mb-[2px]" value='enemy' id='enemy'>
                          <RadioGroupIndicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-3 after:h-3 after:rounded-full after:bg-black" />
                        </RadioGroupItem>
                        <label className="font-['Orbitron']" htmlFor='enemy'>Enemy</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem className="bg-white rounded-full w-[25px] h-[25px] mt-[2px] mb-[2px]" value='ex' id='ex'>
                          <RadioGroupIndicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-3 after:h-3 after:rounded-full after:bg-black" />
                        </RadioGroupItem>
                        <label className="font-['Orbitron']" htmlFor='ex'>Ex</label>
                      </div>
                  </RadioGroup>
                </div>
              </form>
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
              <form className="max-w-md mt-8 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-thin font-['Orbitron'] text-[#ec4899]">Do you consent to playing these games?</h2>
                  
                  <RadioGroup defaultValue="" onValueChange={(value) => handleConsentChange(value)}>
                
                    <div className="flex items-center space-x-2">
              
                        <RadioGroupItem className="bg-white rounded-full w-[25px] h-[25px] mt-[2px] mb-[2px]" value='no' id='no'>
                            <RadioGroupIndicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-3 after:h-3 after:rounded-full after:bg-black" />
                        </RadioGroupItem>
                        <label className="font-['Orbitron']" htmlFor='no'>No</label>
                      </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem className="bg-white rounded-full w-[25px] h-[25px] mt-[2px] mb-[2px]" value='yes' id='yes'>
                            <RadioGroupIndicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-3 after:h-3 after:rounded-full after:bg-black" />
                          </RadioGroupItem>
                          <label className="font-['Orbitron']" htmlFor='yes'>Yes</label>
                        </div>
                  </RadioGroup>
                </div>
              </form>
            </div>

            <button type="submit" onClick={handleSubmit} className="start-button w-full font-['Orbitron'] disabled:bg-[#9ca3af] disabled:hover:bg-[#9ca3af]" disabled={!isFormComplete}>
              CONTINUE
            </button>
          </div>
        </div>
      </main>

      <div className="fixed inset-0 bg-gradient-to-t from-pink-500/20 to-transparent pointer-events-none" />
    </div>
  );
}

export default Onboarding; 