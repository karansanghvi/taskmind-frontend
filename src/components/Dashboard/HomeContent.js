import React, { useEffect, useState } from 'react';
import '../../assets/styles/styles.css';
import { Home as HomeIcon } from 'lucide-react';
import axios from 'axios';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const allTasks = response.data;
        setTasks(allTasks.filter(task => !task.completed)); 
        setCompletedTasks(allTasks.filter(task => task.completed)); 
      } catch (error) {
        console.error('Error fetching tasks: ', error);
      }
    };

    fetchTasks();
  }, []);

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
              <ul>
                {
                  tasks.map(task => (
                    <div className='dashboard-tasks'>
                      <li key={task._id}>{task.title}</li>
                    </div>
                  ))
                }
              </ul>
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
              <ul>
                {
                  completedTasks.map(task => (
                    <div className='dashboard-tasks'>
                      <li key={task._id}>{task.title}</li>
                    </div>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
