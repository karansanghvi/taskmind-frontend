import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import '../assets/styles/styles.css';  
import Features from "../components/Features";
import HeroBanner from "../components/HeroBanner";
import Footer from "../components/Footer";

function Home() {

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header>
        <h1 className="logo">TaskMind</h1>
        <nav ref={navRef}>
          <button onClick={() => scrollToSection('home')} className="link">Home</button>
          <button onClick={() => scrollToSection('features')} className="link">Features</button>
          <button>
            <Link to="/login" className="login">Login</Link>
          </button>
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
