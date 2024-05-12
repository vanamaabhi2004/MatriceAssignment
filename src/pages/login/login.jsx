// Login.jsx
import React, { useState } from 'react';
import './login.css'; 

const LOGIN_URL = 'http://localhost:3001/auth/login';
const REGISTER_URL = 'http://localhost:3001/auth/register';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setErrorMessage('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(isSignUp ? REGISTER_URL : LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }
        if (isSignUp) {
          setSignUpSuccess(true); 
        } else {
          window.location.href = '/home';
        }
      } else {
        const text = await response.text();
        throw new Error(text || 'Invalid response format');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleToggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage('');
    setSignUpSuccess(false);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        {signUpSuccess && <p className="success-message">Sign-up successful! Please sign in.</p>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        <p className="error-message">{errorMessage}</p>
        <p className="toggle-signup" onClick={handleToggleSignUp}>
          {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
        </p>
      </form>
    </div>
  );
};

export default Login;
