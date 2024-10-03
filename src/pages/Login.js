import { useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/styles.css';  
import Footer from "../components/Footer";
import { useUser } from '../context/UserContext'; 

function Login() {
  const navRef = useRef();
  const navigate = useNavigate();
  const { setUser } = useUser(); 

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

  // Input validation
  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address Is Required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email Address Is Invalid';
      valid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);

    // Trigger notifications
    if (newErrors.email) {
      toast.error(newErrors.email);
    }

    if (newErrors.password) {
      toast.error(newErrors.password);
    }

    return valid;
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Store user details and set in context
          localStorage.setItem('fullName', data.fullName);
          localStorage.setItem('email', data.email); // Store email if needed
  
          // Set user details in context
          setUser({
            fullName: data.fullName,
            email: data.email,
          });
  
          toast.success('Logged In Successfully!');
          
          // Redirect to the profile page after a short delay
          setTimeout(() => {
            navigate('/profile');
          }, 2000);
        } else {
          toast.error(data.error || 'Something Went Wrong');
        }
      } catch (error) {
        toast.error('Failed to connect to the server');
        console.error('Login failed:', error);
      }
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
          {errors.email && <p className="error-text">{errors.email}</p>}
          <br/> <br/>
          <p>Enter Password:</p>
          <input 
            type="password" 
            className="text-box" 
            placeholder="********" 
            name="password"
            onChange={handleInputChange}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
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
