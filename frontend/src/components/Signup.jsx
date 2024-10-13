import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
//   const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your signup logic here

    // Redirect to the dashboard after successful signup
    // history.push('/dashboard');
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-80">
        <h2 className="text-lg font-bold mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="signupEmail" className="block text-sm mb-1">Email</label>
            <input
              type="email"
              id="signupEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="signupPassword" className="block text-sm mb-1">Password</label>
            <input
              type="password"
              id="signupPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <button type="submit" className="bg-gray-700 text-white rounded py-2 w-full">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
