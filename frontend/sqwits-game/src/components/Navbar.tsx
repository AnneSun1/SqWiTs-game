import '../App.css'
import { Circle, Triangle, Square } from 'lucide-react'

const Navbar = () => {
    return (
        <nav className="nav-container">
            <div className="nav-content">
            <div className="nav-logo">
                <Circle className="icon" />
                <Triangle className="icon" />
                <Square className="icon" />
            </div>
            <div className="nav-links">
                <a href="/" className="nav-link font-['Orbitron']">HOME</a>
            </div>
            <div className="nav-spacer" />
            </div>
      </nav>
    )
}


export default Navbar;