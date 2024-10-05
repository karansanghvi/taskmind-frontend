import React, { useEffect, useState } from 'react';
import '../../assets/styles/styles.css';
import { Layers as LayersIcon } from 'lucide-react';
import TaskModal from '../Dashboard/TaskModal';
import { AiFillDelete } from "react-icons/ai";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/tasks', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    setTasks(data);
  }

  // load tasks when it mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // add new task
  const addTask = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title: taskTitle }),
    });
    const newTask = await response.json();
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskTitle("");
    setModalOpen(false);
  }

  // toggle task completion with radio button
  const handleTaskSelection = async (index) => { 
    const selectedTask = tasks[index];
    const updatedCompletionStatus = !selectedTask.completed;

    // update task status in backend
    await fetch(`http://localhost:5000/api/tasks/${selectedTask._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: updatedCompletionStatus
      }),
    });

    const updatedTasks = tasks.map((task, idx) => 
      idx === index ? { ...task, completed: updatedCompletionStatus } : task
    );
    setTasks(updatedTasks);
    setSelectedTaskIndex(index);  
  };

  // delete a task
  const deleteTask = async (index) => {
    const taskId = tasks[index]._id;
    console.log('Deleting task with ID:', taskId);
    await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'DELETE',
    });
    const updatedTasks = tasks.filter((task, idx) => idx !== index);
    setTasks(updatedTasks);
  };

  return (
    <>
      <div className='dashboard-section'>
        <h1 className='title flex items-center'>
          <LayersIcon size={40} className="mr-2" /> 
          Tasks
        </h1>
        <hr className='mt-4 mb-4' />
        <div className='add-task-container'>
          <button onClick={() => setModalOpen(true)} className='add-new-task-btn'>Create Task</button>
        </div>

        {
          modalOpen && (
            <TaskModal>
              <h1 className='add-task-title'>Add Task</h1>
              <p className='enter-title'>Enter Title:</p>
              <input 
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder='Task Title'
                className='add-textBox'
              />
              <br/> <br/>
              <div className="btn-container">
                <button onClick={() => setModalOpen(false)} className='cancel-task-button'>Cancel</button>
                <button onClick={addTask} className='add-task-button'>Add Task</button>
              </div>
            </TaskModal>
          )
        }

        <ul>
          {
            tasks.filter(task => !task.completed).map((task, index) => (
              <li key={task._id}>
                <div className='bg-indigo-100 p-4 task-container flex justify-between items-center'>
                  <div className='flex items-center'>
                    <div 
                      onClick={() => handleTaskSelection(index)} 
                      className={`custom-radio ${selectedTaskIndex === index ? 'checked' : ''}`}
                    ></div>
                    <span className='ml-4'>
                      <h2>{task.title}</h2>
                    </span>
                  </div>
                  <AiFillDelete
                    onClick={() => deleteTask(index)}
                    className='task-delete-btn'
                  />
                </div>
              </li>
            ))
          }
        </ul>

        <br/> <br/>

        <h1 className='title flex items-center'>
          <LayersIcon size={40} className="mr-2" /> 
          Completed Tasks
        </h1>
        <hr className='mt-4 mb-4' />
        <ul>
          {
            tasks.filter(task => task.completed).map((task, index) => (
              <li key={task._id}>
                <div className='bg-green-100 p-4 task-container flex justify-between items-center'>
                  <div className='flex items-center'>
                    <span className='ml-4'>
                      <h2 className='line-through'>{task.title}</h2>
                    </span>
                  </div>
                  <AiFillDelete
                    onClick={() => deleteTask(index)} 
                    className='task-delete-btn'
                  />
                </div>
                <br/>
              </li>
            ))
          }
        </ul>
      </div> 
    </>
  );
}

export default Tasks;
