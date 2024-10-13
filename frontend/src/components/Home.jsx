// src/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import sir from '../../Images/1.jpg'; 
// import './App.css';

const HomePage = () => {
  return (
    <section className='flex items-center justify-between py-12 px-8'>
      <div className='flex flex-col'>
        <h1 className='text-4xl font-bold text-gray-900 mb-2'>
          Felt Overloaded with the PDF and Other Files?
        </h1>
        <p className='text-sm text-gray-600'>
          We provide personalized solutions to help you manage your learning materials effectively.
        </p>
        <Link to="/login">
          <button className="mt-4 bg-gray-700 text-white rounded py-2 px-4">
            Get Started
          </button>
        </Link>
      </div>
      <div>
        <img src={sir} alt="Overloaded" className='mr-[15%] w-[100%] h-[25%] rounded-lg' />
      </div>
    </section>
  );
};

export default HomePage;
