import React from 'react';
import hero from '../assets/images/Frame 2202.png';
import {Link } from "react-router-dom";

function HeroBanner() {
  return (
    <>
     <div className='hero-banner grid md:grid-cols-2 grid-cols-1 gap-30 p-20'>
        <div>
            <h1>Supercharge Your Productivity with AI-Powered Task & Note Management</h1>
            <div className='get-started-button'>
                <Link to="login">Get Started</Link>
            </div>
        </div>
        <div className='md:ml-40 md:mt-0 mt-10'>
            <img src={hero} alt="" width={400} height={400} />
        </div>
     </div> 
    </>
  )
}

export default HeroBanner
