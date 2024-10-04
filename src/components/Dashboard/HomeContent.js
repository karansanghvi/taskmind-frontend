import React from 'react';
import '../../assets/styles/styles.css';
import { Home as HomeIcon } from 'lucide-react';

function Home() {
  return (
    <>
      <div className='dashboard-section'>
        <h1 className='title flex items-center'>
          <HomeIcon size={40} className="mr-2" /> 
          Home
        </h1>
        <hr className='mt-4 mb-4' />
        <div className='grid md:grid-cols-2 gap-10'>
          <div>
            <div className='box'>
              <h2>Tasks</h2>
              <hr className='mt-4 mb-4' />
            </div>
            <br/>
            <div className='box'>
              <h2>Notes</h2>
              <hr className='mt-4 mb-4' />
            </div>
          </div>
          <div>
            <div className='box'>
              <h2>Tasks Status</h2>
              <hr className='mt-4 mb-4' />
            </div>
            <br/>
            <div className='box'>
              <h2>Completed Tasks</h2>
              <hr className='mt-4 mb-4' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
