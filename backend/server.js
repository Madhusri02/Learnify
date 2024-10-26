const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const dataDir = path.join(__dirname, 'data');
const usersFile = path.join(dataDir, 'users.json');

app.post('/api/signup', (req, res) => {
  const { name, age, course, email, password } = req.body;
  
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  let users = [];
  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile));
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists!' });
  }

  const newUser = {
    name,
    age,
    course,
    email,
    password,
    performance: {
      scores: []
    }
  };

  users.push(newUser);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.status(200).json({ success: true, message: 'Signup successful!', user: newUser });
});

// API to update user performance
app.post('/api/updatePerformance', (req, res) => {
  const { email, newScore1, newScore2 } = req.body;
  
  if (!fs.existsSync(usersFile)) {
    return res.status(400).json({ success: false, message: 'User not found!' });
  }

  let users = JSON.parse(fs.readFileSync(usersFile));
  const userIndex = users.findIndex((user) => user.email === email);

  if (userIndex === -1) {
    return res.status(400).json({ success: false, message: 'User not found!' });
  }

  // Append new performance scores
  users[userIndex].performance.scores.push({
    score : newScore
  });
  users[userIndex].performance.updatedAt = new Date().toISOString();

  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.status(200).json({ success: true, message: 'Performance updated!', user: users[userIndex] });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!fs.existsSync(usersFile)) {
    return res.status(400).json({ success: false, message: 'User not found!' });
  }

  const users = JSON.parse(fs.readFileSync(usersFile));
  const user = users.find((user) => user.email === email && user.password === password);
  
  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid email or password!' });
  }

  res.status(200).json({ success: true, message: 'Login successful!', user });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
