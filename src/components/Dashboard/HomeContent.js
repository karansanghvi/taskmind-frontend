import React, { useEffect, useState } from 'react';
import '../../assets/styles/styles.css';
import { Home as HomeIcon } from 'lucide-react';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function HomeContent() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [progress, setProgress] = useState({
    completed: 0,
    pending: 0
  });
  const [notes, setNotes] = useState([]); 

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

        // Calculate progress
        const totalTasks = allTasks.length;
        const completedCount = allTasks.filter(task => task.completed).length;
        const pendingCount = totalTasks - completedCount;

        setProgress({
          completed: totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0,
          pending: totalTasks > 0 ? (pendingCount / totalTasks) * 100 : 0
        });

      } catch (error) {
        console.error('Error fetching tasks: ', error);
      }
    };

    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notes', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setNotes(response.data); 
      } catch (error) {
        console.error('Error fetching notes: ', error);
      }
    };

    fetchTasks();
    fetchNotes();
  }, []);

  return (
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
                  <>
                  <div className='dashboard-tasks' key={task._id}>
                    <li>{task.title}</li>
                  </div>
                  <br/>
                  </>
                ))
              }
            </ul>
          </div>
          <br />
          <div className='box'>
            <h2>Notes</h2>
            <hr className='mt-4 mb-4' />
            <ul>
              {
                notes.map(note => (
                  <>
                  <div className='dashboard-tasks' key={note._id}>
                    <li>{note.title}</li>
                  </div>
                  <br/>
                  </>
                ))
              }
            </ul>
          </div>
        </div>
        <div>
          <div className='box'>
            <h2>Task Status</h2>
            <hr className='mt-4 mb-4' />
            <div className="progress-container flex space-x-10">
              <div className="circle-progress">
                <CircularProgressbar 
                  value={progress.completed} 
                  text={`${progress.completed.toFixed(0)}%`} 
                  styles={{
                    path: {
                      stroke: `#4caf50`, 
                    },
                    trail: {
                      stroke: '#d6d6d6',
                    },
                    text: {
                      fill: '#000',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }
                  }} 
                />
                <h4 className='text-md mt-2 text-black font-bold'>Completed</h4>
              </div>

              <div className="circle-progress">
                <CircularProgressbar 
                  value={progress.pending} 
                  text={`${progress.pending.toFixed(0)}%`} 
                  styles={{
                    path: {
                      stroke: `#FF0000`, 
                    },
                    trail: {
                      stroke: '#d6d6d6',
                    },
                    text: {
                      fill: '#000',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }
                  }} 
                />
                <h4 className='text-md mt-2 text-black font-bold'>In Progress</h4>
              </div>
            </div>
          </div>
          <br />
          <div className='box'>
            <h2>Completed Tasks</h2>
            <hr className='mt-4 mb-4' />
            <ul>
              {
                completedTasks.map(task => (
                  <>
                  <div className='dashboard-tasks' key={task._id}>
                    <li>{task.title}</li>
                  </div>
                  <br/>
                  </>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeContent;
