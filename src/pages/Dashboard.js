import { useState, useEffect } from "react";
import { Home, StickyNote, Layers, Calendar, LifeBuoy, Settings, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import HomeContent from "../components/Dashboard/HomeContent";
import TasksContent from "../components/Dashboard/TasksContent";
import NotesContent from "../components/Dashboard/NotesContent";
import CalendarContent from "../components/Dashboard/CalendarContent";
import SettingsContent from "../components/Dashboard/SettingsContent";
import HelpContent from "../components/Dashboard/HelpContent";

function Dashboard() {
  const navigate = useNavigate();
  const [activeContent, setActiveContent] = useState("Dashboard");
  const [fullName, setFullName] = useState('');
  const [tasksUpdated, setTasksUpdated] = useState(false); // State to trigger re-fetch of tasks for Calendar

  useEffect(() => {
    const storedFullName = localStorage.getItem('fullName');
    if (storedFullName) {
      setFullName(storedFullName);
    }
  }, []);

  // Function to be passed to TasksContent to trigger Calendar refresh
  const handleTaskAdded = () => {
    setTasksUpdated(true);
  };

  // Render the selected content
  const renderContent = () => {
    switch (activeContent) {
      case "Home":
        navigate('/');
        break;
      case "Dashboard":
        return <HomeContent />;
      case "Tasks":
        return <TasksContent onTaskAdded={handleTaskAdded} />; // Pass the task update handler to TasksContent
      case "Notes":
        return <NotesContent />;
      case "Calendar":
        return <CalendarContent tasksUpdated={tasksUpdated} setTasksUpdated={setTasksUpdated} />; // Pass task update state to Calendar
      case "Settings":
        return <SettingsContent />;
      case "Help":
        return <HelpContent />;
      default:
        return <h2 className="text-white">Welcome</h2>;
    }
  };

  return (
    <>
      <div className="flex">
        <Sidebar>
          <SidebarItem 
            icon={<Home size={20} />} 
            text="Home" 
            active={activeContent === "Home"} 
            onClick={() => setActiveContent("Home")}  
          />
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            text="Dashboard" 
            active={activeContent === "Dashboard"} 
            onClick={() => setActiveContent("Dashboard")}  
          />
          <SidebarItem 
            icon={<Layers size={20} />} 
            text="Tasks" 
            active={activeContent === "Tasks"} 
            onClick={() => setActiveContent("Tasks")}  
          />
          <SidebarItem 
            icon={<StickyNote size={20} />} 
            text="Notes" 
            active={activeContent === "Notes"} 
            onClick={() => setActiveContent("Notes")}  
          />
          <SidebarItem 
            icon={<Calendar size={20} />} 
            text="Calendar" 
            active={activeContent === "Calendar"} 
            onClick={() => setActiveContent("Calendar")}  
          />
          <hr className="my-3" />
          <SidebarItem 
            icon={<Settings size={20} />} 
            text="Settings" 
            active={activeContent === "Settings"} 
            onClick={() => setActiveContent("Settings")}  
          />
          <SidebarItem 
            icon={<LifeBuoy size={20} />} 
            text="Help" 
            active={activeContent === "Help"} 
            onClick={() => setActiveContent("Help")} 
          />
        </Sidebar>

        <div className="flex-grow p-6 sidebar-main">
          <h1 className="font-bold text-white">👋 Welcome, {fullName}</h1>
          <div className="container">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
