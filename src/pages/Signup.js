import { useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/styles.css';  
import Footer from "../components/Footer";

function Signup() {

  const navRef = useRef();
  const navigate = useNavigate();

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

  // input validation
  const validate = () => {
    let valid = true;
    let newErrors = {};

    if(!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      valid = false;
    }

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

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('http://localhost:5000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success('Account Created Successfully!');
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          toast.error(data.error || 'Something Went Wrong');
        }
      } catch (error) {
        toast.error('Failed to connect to the server');
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
          <br/> <br/>
          <div className="login-button">
            <button type="submit" onClick={handleSubmit}>Login</button>
          </div>
          <br/> 
          <p className="text-center">Have an account? <span className="signup"><Link to="/login">Login</Link></span></p>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </>
  );
}

export default Signup;
