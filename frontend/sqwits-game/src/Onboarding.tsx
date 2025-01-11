import { Circle, Triangle, Square } from 'lucide-react'
import { useState } from 'react'

function Onboarding() {
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
    // Handle form submission here
  };

  return (
    <div className="app-container">
      <nav className="nav-container">
        <div className="nav-content">
          <div className="nav-logo">
            <Circle className="icon" />
            <Triangle className="icon" />
            <Square className="icon" />
          </div>
          <div className="nav-links">
            <a href="/" className="nav-link">HOME</a>
          </div>
          <div className="nav-spacer" />
        </div>
      </nav>

      <main className="main-container">
        <div className="onboarding-container max-w-2xl mx-auto p-8">
          <h1 className="text-4xl font-bold mb-8 text-center">
            <span className="title-gray">WELCOME TO THE</span>
            <br />
            <span className="title-pink">GAME</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <label htmlFor="name" className="block text-lg mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-3 rounded-lg bg-white/10 border border-pink-500/30 text-white"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

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

            <div className="form-group">
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

            <button type="submit" className="start-button w-full">
              CONTINUE
            </button>
          </form>
        </div>
      </main>

      <div className="fixed inset-0 bg-gradient-to-t from-pink-500/20 to-transparent pointer-events-none" />
    </div>
  );
}

export default Onboarding; 