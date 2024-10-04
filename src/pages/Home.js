import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import '../assets/styles/styles.css';  
import Features from "../components/Features";
import HeroBanner from "../components/HeroBanner";
import Footer from "../components/Footer";

function Home() {

  const navRef = useRef();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const storedFullName = localStorage.getItem('fullName');
    if (storedFullName) {
      setFullName(storedFullName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('fullName');
    setFullName('');
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  return (
    <>
      <header>
        <h1 className="logo">TaskMind</h1>
        <nav ref={navRef}>
          <button onClick={() => scrollToSection('home')} className="link">Home</button>
          <button onClick={() => scrollToSection('features')} className="link">Features</button>
          {
            fullName ? (
              <div className="dropdown">
                <button onClick={toggleDropdown} className="login">{fullName}</button>
                {dropdownOpen && (
                  <div className="dropdown-content">
                    <Link to="/profile" className="dropdown-item">Profile</Link>
                    <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                    <button onClick={handleLogout} className="dropdown-item">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <button>
                <Link to="/login" className="login">Login</Link>
              </button>
            )
          }
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>

      <div id="home">
        <HeroBanner />
      </div>
      <br />
      <div id="features">
        <Features/>
      </div>

      <Footer/>
    </>
  );
}

export default Home;
