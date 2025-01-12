import '../App.css'
import { Circle, Triangle, Square } from 'lucide-react'
import { Link } from 'react-router-dom';

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
                <Link to="/awards" className="nav-link">AWARDS</Link>
            </div>
            <div className="nav-spacer" />
            </div>
      </nav>
    )
}


export default Navbar;