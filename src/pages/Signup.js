import { useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/styles.css';  
import Footer from "../components/Footer";
import axios from "axios";
import { UserProvider, useUser } from '../context/UserContext'; 

function Signup() {
  const navRef = useRef();
  const navigate = useNavigate();
  const { setUser } = useUser(); 

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      valid = false;
    }

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
    if (newErrors.fullName) {
      toast.error(newErrors.fullName);
    }

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
  
    console.log('Form data before submission: ', formData);
  
    if (validate()) {
      try {
        // Send signup data to the server using axios
        await axios.post('http://localhost:5000/api/signup', { 
          fullName: formData.fullName, 
          email: formData.email, 
          password: formData.password 
        });
  
        // Set user details in context
        setUser({
          fullName: formData.fullName,
          email: formData.email,
        });
  
        toast.success('Account Created Successfully!');
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } catch (error) {
        console.error('Signup failed:', error);
        toast.error(error.response?.data?.error || 'Something Went Wrong');
      }
    }
  };  

  return (
    <UserProvider> 
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
            <h1>Create Account</h1>
            <p>Enter Full Name:</p>
            <input 
              type="text" 
              className="text-box" 
              placeholder="John Doe"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange} 
            />
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}
            <br/> <br/>
            <p>Enter Email Address:</p>
            <input 
              type="text" 
              className="text-box" 
              placeholder="john.doe@gmail.com" 
              name="email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
            <br/> <br/>
            <div className="login-button">
              <button type="submit" onClick={handleSubmit}>Signup</button>
            </div>
            <br/> 
            <p className="text-center">Have an account? <span className="signup"><Link to="/login">Login</Link></span></p>
          </div>
        </div>

        <Footer />
        <ToastContainer />
      </>
    </UserProvider>
  );
}

export default Signup;
