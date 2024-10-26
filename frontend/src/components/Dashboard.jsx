import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { Chart as ChartJS } from 'chart.js/auto';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { user } = location.state;

  const scores = user.performance.scores || [];
  const labels = scores.map((_, index) => `Attempt ${index + 1}`);
  const score1Data = scores.map((entry) => entry.score1 || 0);
  const score2Data = scores.map((entry) => entry.score2 || 0);

  const data = {
    labels: labels.length > 0 ? labels : ['No attempts yet'],
    datasets: [
      {
        label: 'Score 1',
        data: score1Data.length > 0 ? score1Data : [39],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Score 2',
        data: score2Data.length > 0 ? score2Data : [26],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  // Skills data
  const skills = user.skills || [];
  const skillsLabels = skills.map((skill) => skill.name);
  const skillsData = skills.map((skill) => skill.level || 0);

  const barData = {
    labels: skillsLabels.length > 0 ? skillsLabels : ['Python'],
    datasets: [
      {
        label: 'Skills Level',
        data: skillsData.length > 0 ? skillsData : [56],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  const [topic, setTopic] = useState('');

  const handleAssessmentClick = () => {
    navigate('/assessment'); 
  };

  const handleReadingMaterialClick = () => {
    navigate('/material', { state: { topic } }); 
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-full md:w-3/4 lg:w-2/3 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-4 text-center">User Dashboard</h1>
        <p className="text-lg text-gray-700 mb-2 text-center">Welcome, {user.name}!</p>
        <p className="text-md text-gray-600 mb-4 text-center">Course: {user.course}</p>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Performance Over Time:</h2>
          <div style={{ height: '300px' }}>
            <Line data={data} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-full md:w-3/4 lg:w-2/3 mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-2">Skills:</h2>
        <div style={{ height: '300px' }}>
          <Bar data={barData} options={{ maintainAspectRatio: false }} />
          {/* Display skills in a small box on the graph */}
          <div className="bg-gray-200 p-4 rounded shadow-md absolute top-4 right-4">
            <h3 className="font-bold">Skills</h3>
            <ul>
              {skills.map((skill, index) => (
                <li key={index} className="text-sm">{user.skill}: {user.score}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-full md:w-3/4 lg:w-2/3"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Reading Material:</h2>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic to read"
          className="border rounded w-full p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-between mt-4">
          <button
            onClick={handleAssessmentClick}
            className="bg-blue-600 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Assessment
          </button>
          <button
            onClick={handleReadingMaterialClick}
            className="bg-green-600 text-white rounded-lg py-2 px-4 hover:bg-green-700 transition duration-300 ease-in-out"
          >
            Reading Material
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
