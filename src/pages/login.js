import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css'; // Ensure this file exists

const Login = () => {
  const [name, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [errorMessage, setError] = useState(''); 
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3003/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        console.log('Logged in:', data);
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        // Handle login error
        setError(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login.');
    }
  };

  return (
    <div className="auth-screen login-screen"> {/* Container for the login screen */}
      <div className="caution-tape"></div> 
      <h1>Login</h1> 
      <form onSubmit={handleLogin}> {/* Form element that triggers handleLogin on submit */}
        <div>
          <label>Username</label> 
          <input 
            type="text"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Input username"
          />
        </div>
        <div>
          <label>Password</label> 
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Login password"
          />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>} {}
        <button type="submit">Login</button> 
      </form>
      {/* Link to registration page */}
      <p>
        New to us? 
        <span className="register-link">
          <Link to="/register"> Sign up here</Link>
        </span>
      </p> 
    </div>
  );
};

export default Login; 
