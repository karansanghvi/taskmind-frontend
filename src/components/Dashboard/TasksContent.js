import React, { useState } from 'react';
import '../../assets/styles/styles.css';
import { Layers as LayersIcon } from 'lucide-react';
import TaskModal from '../Dashboard/TaskModal';

function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  
  // add a new task
  const addTask = () => {
    if (taskTitle.trim()) {
      setTasks(
        [...tasks, {
          title: taskTitle,
          completed: false
        }]
      );
      setTaskTitle("");
      setModalOpen(false);
    }
  };

  // toggle task 
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, idx) => 
      idx === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // delete a task
  const deleteTask = (index) => {
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
        <button onClick={() => setModalOpen(true)}>Add Task</button>

        {
          modalOpen && (
            <TaskModal>
              <h2>Add Task</h2>
              <p>Enter Title:</p>
              <input 
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder='Task Title'
              />

              <br/>

              <button onClick={addTask} className='add-task-button'>Add</button>
              <button onClick={() => setModalOpen(false)} className='add-task-button'>Cancel</button>
            </TaskModal>
          )
        }

        <ul>
          {
            tasks.map((task, index) => (
              <li key={index} className={task.completed ? 'completed' : ''}>
                <span onClick={() => toggleTaskCompletion(index)} >
                  <strong>{task.title}</strong>
                </span>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </li>
            ))
          }
        </ul>
     </div> 
    </>
  )
}

export default Tasks
