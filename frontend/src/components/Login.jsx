import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const Login = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [course, setCourse] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const response = await axios.post('http://localhost:5000/api/login', { email, password });
        if (response.data.success) {
          navigate('/dashboard', { state: { user: response.data.user } });
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/signup', {
          name,
          age,
          course,
          email,
          password
        });
        if (response.data.success) {
          navigate('/dashboard', { state: { user: { name, age, course, email } } });
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 w-80"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-lg font-bold mb-4">{isLogin ? 'Login' : 'Signup'}</h2>
        <div className="flex justify-between mb-4">
          <button
            className={`text-sm ${isLogin ? 'font-bold' : 'text-gray-500'}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`text-sm ${isLogin ? 'text-gray-500' : 'font-bold'}`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border rounded w-full p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="age" className="block text-sm mb-1">Age</label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="border rounded w-full p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="course" className="block text-sm mb-1">Course</label>
                <input
                  type="text"
                  id="course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="border rounded w-full p-2"
                  required
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label htmlFor="loginEmail" className="block text-sm mb-1">Email</label>
            <input
              type="email"
              id="loginEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="loginPassword" className="block text-sm mb-1">Password</label>
            <input
              type="password"
              id="loginPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <button type="submit" className="bg-gray-700 text-white rounded py-2 w-full">
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
