import React, { useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../assets/styles/styles.css';

const localizer = momentLocalizer(moment);

function Calendar({ tasksUpdated, setTasksUpdated }) {
  const [events, setEvents] = useState([]);

  // Fetch tasks from the backend and filter out completed tasks
  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/tasks', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const tasks = await response.json();

    // Filter out completed tasks and map them to calendar events
    const taskEvents = tasks
      .filter(task => !task.completed) // Only include tasks that are not completed
      .map(task => ({
        title: task.title,
        start: new Date(task.deadline), 
        end: new Date(task.deadline),  
      }));

    setEvents(taskEvents);
  };

  // Fetch tasks whenever the component mounts or tasks are updated
  useEffect(() => {
    fetchTasks();

    // Reset the tasksUpdated flag after fetching
    if (tasksUpdated) {
      setTasksUpdated(false);
    }
  }, [tasksUpdated]);

  return (
    <>
      <div className="dashboard-section">
        <h1 className="title flex items-center">
          <CalendarIcon size={40} className="mr-2" />
          Calendar
        </h1>
        <hr className="mt-4 mb-4" />
        
        <div style={{ height: '500px' }}>
          <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>
      </div>
    </>
  );
}

export default Calendar;
