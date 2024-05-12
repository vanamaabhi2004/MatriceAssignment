const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000', 
}));

mongoose.connect('mongodb://localhost:27017/assignment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Candidate Schema
const candidateSchema = new mongoose.Schema({
  name: String,
  status: String,
  feedback: String,
  rating: [Number]
});

const Candidate = mongoose.model('Candidate', candidateSchema, 'candidates');

const loginSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const Login = mongoose.model('Login', loginSchema, 'login');

// Register route
app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await Login.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Login({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Login.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
