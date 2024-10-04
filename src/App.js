import React from "react";
import '../src/assets/styles/styles.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
