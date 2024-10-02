import { useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/styles.css';  
import Footer from "../components/Footer";

function Login() {

  const navRef = useRef();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

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

  // input validation
  const validate = () => {
    let valid = true;
    let newErrors = {};

    if(!formData.email.trim()) {
      newErrors.email = 'Email Address Is Required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email Address Is Invalid';
      valid = false;
    }

    if(formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);

    // trigger notifications
    if (newErrors.email) {
      toast.error(newErrors.email);
    }

    if (newErrors.password) {
      toast.error(newErrors.password);
    }

    return valid;
  };

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      toast.success('Account Created Successfully!!');
    }
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
          <input 
            type="text" 
            className="text-box" 
            placeholder="john.doe@gmail.com" 
            name="email"
            onChange={handleInputChange}
          />
          <br/> <br/>
          <p>Enter Password:</p>
          <input 
            type="password" 
            className="text-box" 
            placeholder="********" 
            name="password"
            onChange={handleInputChange}
          />
          <br/> <br/>
          <div className="login-button">
            <button type="submit" onClick={handleSubmit}>Login</button>
          </div>
          <br/> 
          <p className="text-center">Don't have an account? <span className="signup"><Link to="/signup">Signup</Link></span></p>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </>
  );
}

export default Login;
