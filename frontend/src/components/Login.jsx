import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';  // Import axios

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in with:", email, password);
      // Implement your login logic here
      // You can also create an API endpoint for login if needed
      navigate('/dashboard'); // Redirect to the dashboard after successful login
    } else {
      try {
        // Signup logic using Axios
        const response = await axios.post('http://localhost:5000/api/signup', {
          email,
          password,
        });
        console.log(response.data.message); // Log success message
        navigate('/dashboard'); // Redirect to the dashboard after successful signup
      } catch (error) {
        console.error("Signup failed:", error.response ? error.response.data : error.message);
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
