import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {

    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:5000/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                setUserDetails(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.error : 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    if (loading) {
        <p className='profile-section'>Loading..</p>
    }

    if (error) {
        return <p className='profile-section'>Error: {error}</p>;
    }

    if (!userDetails) {
        return <p className='profile-section'>No user details found!!</p>;
    }

  return (
    <>
      <div className='profile-section'>
        <h1>Profile</h1>
        <p>Full Name: {userDetails.fullName}</p>
        <p>Email: {userDetails.email}</p>
        <p>Password: {userDetails.password}</p>
      </div>
    </>
  )
}

export default Profile
