import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import '../assets/styles/styles.css';  
import Footer from "../components/Footer";

function Login() {

  const navRef = useRef();
  const navigate = useNavigate();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const scrollToHome = () => {
    navigate('/');
    setTimeout(() => {
      const homeSection = document.getElementById('home');
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); 
  };

  const scrollToFeatures = () => {
    navigate('/');
    setTimeout(() => {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <header>
        <h1 className="logo">TaskMind</h1>
        <nav ref={navRef}>
          <button onClick={scrollToHome} className="link">Home</button>
          <button onClick={scrollToFeatures} className="link">Features</button>
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

      <div className="login-page p-20">
        <div className="login-section">
          <h1>Welcome Back</h1>
          <p>Enter Email Address:</p>
          <input type="text" className="text-box" placeholder="john.doe@gmail.com" />
          <br/> <br/>
          <p>Enter Password:</p>
          <input type="password" className="text-box" placeholder="********" />
          <br/> <br/>
          <div className="login-button">
            <button type="submit">Login</button>
          </div>
          <br/> 
          <p className="text-center">Have have an account? <span className="signup"><Link to="/login">Login</Link></span></p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
