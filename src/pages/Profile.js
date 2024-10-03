import React from 'react';
import { useUser } from '../context/UserContext'; 
import '../assets/styles/styles.css';

function Profile() {
  const { user } = useUser(); 

  return (
    <div className="profile-page p-20">
      <h1>User Profile</h1>
      {user ? (
        <div className="profile-details">
          <p><strong>Full Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>No user data available. Please sign up.</p>
      )}
    </div>
  );
}

export default Profile;
