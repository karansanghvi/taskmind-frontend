import { useState, useRef, useEffect } from "react";
import { Home, StickyNote, Layers, Calendar, LifeBuoy, Settings } from "lucide-react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Sidebar, { SidebarItem } from "../components/Sidebar";
import HomeContent from "../components/Dashboard/HomeContent";
import TasksContent from "../components/Dashboard/TasksContent";
import NotesContent from "../components/Dashboard/NotesContent";
import CalendarContent from "../components/Dashboard/CalendarContent";
import SettingsContent from "../components/Dashboard/SettingsContent";
import HelpContent from "../components/Dashboard/HelpContent";

function Dashboard() {
  const navRef = useRef();
  const navigate = useNavigate();
  const [activeContent, setActiveContent] = useState("Home");
  const [fullName, setFullName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const storedFullName = localStorage.getItem('fullName');
    if (storedFullName) {
      setFullName(storedFullName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('fullName');
    setFullName('');
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };


  const renderContent = () => {
    switch (activeContent) {
      case "Home":
        return <HomeContent/>;
      case "Tasks":
        return <TasksContent/>;
      case "Notes":
        return <NotesContent/>;
      case "Calendar":
        return <CalendarContent/>;
      case "Settings":
        return <SettingsContent/>;
      case "Help":
        return <HelpContent/>;
      default:
        return <h2 className="text-white">Welcome</h2>;
    }
  };

  return (
    <>
    <header>
    <h1 className="logo">TaskMind</h1>
        <nav ref={navRef}>
          <button onClick={() => scrollToSection('home')} className="link">Home</button>
          <button onClick={() => scrollToSection('features')} className="link">Features</button>
          {
            fullName ? (
              <div className="dropdown">
                <button onClick={toggleDropdown} className="login">{fullName}</button>
                {dropdownOpen && (
                  <div className="dropdown-content">
                    <Link to="/profile" className="dropdown-item">Profile</Link>
                    <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                    <button onClick={handleLogout} className="dropdown-item">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <button>
                <Link to="/login" className="login">Login</Link>
              </button>
            )
          }
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
    </header>
    <div className="flex">
      <Sidebar>
        <SidebarItem 
          icon={<Home size={20} />} 
          text="Home" 
          active={activeContent === "Home"} 
          onClick={() => setActiveContent("Home")}  
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
