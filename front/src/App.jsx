
import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShootingStarsAndStarsBackgroundDemo from './shooting-stars-and-stars-background-demo';
import RegisterPage from './components/Home'; // Import the Register Page component
import AboutUs from './components/AboutUs';
import Contact from './components/contactus';
import Profile from './components/profile';
import Events from './components/events';
import Login from './components/login';
import Signup from './components/signup';
import Registration from './components/Registration';
import EventDetail from './components/eventDetails';
import UpdateTeam from './components/updateDetails';
import UpdateUser from './components/updateUser';
function App() {
  return (
    <Router>
      
      <div className="min-h-screen bg-neutral-900 relative">
        
        <Routes>
          <Route path="/" element={<ShootingStarsAndStarsBackgroundDemo />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/registration" element={<Registration/>} />
          <Route path="/event/:eventId" element={<EventDetail />} />
          <Route path="/update-team/:eventId" element={<UpdateTeam />} />
          <Route path="/update-user" element={<UpdateUser/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
