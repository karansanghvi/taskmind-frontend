import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import axios from 'axios';
import Footer from '../components/Footer';

function Profile() {

  const navRef = useRef();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false); // To toggle between view and edit mode
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

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token'); 
      if (!token) {
        setError('No token found. Please login.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data); 
        setFullName(response.data.fullName); // Store values for editing
        setEmail(response.data.email); // Store values for editing
      } catch (err) {
        setError(err.response?.data?.error || 'Something went wrong'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchUserDetails(); 
  }, []);

  const handleEditProfile = async () => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      setError('No token found. Please login.');
      return;
    }

    try {
      await axios.put('http://localhost:5000/api/profile', 
        { fullName, email }, // Send updated details
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserDetails({ ...userDetails, fullName, email }); // Update local state with the new details
      setIsEditing(false); // Exit edit mode
    } catch (err) {
      setError(err.response?.data?.error || 'Error updating profile'); // Handle error
    }
  };

  if (loading) {
    return <p className='profile-section'>Loading...</p>;
  }

  if (error) {
    return <p className='profile-section'>Error: {error}</p>;
  }

  if (!userDetails) {
    return <p className='profile-section'>No user details found!</p>;
  }

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
                    <button onClick={handleLogout}><p className="text-black">Logout</p></button>
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

    <div className='profile-section p-10'>
      <h1 className='profile-title'>Profile</h1>
      <hr className='mt-4 mb-4' />

      {isEditing ? (
        <div>
          <label>Full Name:</label>
          <br/>
          <input 
            type="text" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
            className='profile-text'
          />
          <br/> <br/>
          <label>Email:</label>
          <br/>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className='profile-text'
          />
          <br/> <br/>
          <div className='profile-button-container'>
            <button onClick={() => setIsEditing(false)} className='cancel-profile'>Cancel</button>
            <button onClick={handleEditProfile} className='save-profile'>Save Profile</button>
          </div>
        </div>
      ) : (
        <div>
          <label>Full Name:</label>
          <br/>
          <p className='profile-text'>{userDetails.fullName}</p>
          <p>Email:</p>
          <p className='profile-text'>{userDetails.email}</p> 
          <br />
          <div className='edit-profile' onClick={() => setIsEditing(true)}>
            Edit Profile
          </div>
        </div>
      )}
    </div>

    <Footer/>
    </>
  );
}

export default Profile;
