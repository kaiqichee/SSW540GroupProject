import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from './pages/user/Signup.js';
import { Login } from './pages/user/Login.js';
import { Profile } from './pages/user/Profile.js';
import { Home } from './pages/Home.js';
import { Navbar } from './pages/common/Navbar.js';
import { CreateRes } from './pages/reservation/CreateRes.js';
import React from 'react';


function App() {
  localStorage.setItem('loggedIn', false);

  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
        <Route exact path="/" element={<Home/>} />
          <Route exact path="/signup" element={<Signup/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/reserve" element={<CreateRes/>} />
          <Route exact path="/profile" element={<Profile/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
