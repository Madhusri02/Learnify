import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import HomePage from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className='bg-[#FAF7F0] min-h-screen'>
        <header>
          <nav className='flex justify-between items-center p-4 bg-white shadow-md'>
            <div id='logo' className='text-xl font-bold text-gray-800'>
              Logo
            </div>
            <div className='flex space-x-8 text-center'>
              <Link to="/" className='text-gray-700 hover:text-gray-900'>
                Home
              </Link>
              <Link to="#" className='text-gray-700 hover:text-gray-900'>
                About Us
              </Link>
              <Link to="#" className='text-gray-700 hover:text-gray-900'>
                Profile
              </Link>
            </div>
          </nav>
          <hr />
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
