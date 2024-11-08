import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css'; // Ensure this file exists

const Login = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate(); 

  const handleLogin = (e) => { 
    e.preventDefault(); 
    // Simple validation for demo purposes
    if (username === 'admin' && password === 'password') { 
      setErrorMessage(''); 
      navigate('/dashboard'); 
    } else {
      setErrorMessage('Incorrect username or password'); 
    }
  };

  return (
    <div className="auth-screen login-screen"> {/* Container for the login screen */}
      <h1>Login</h1> 
      <form onSubmit={handleLogin}> {/* Form element that triggers handleLogin on submit */}
        <div>
          <label>Username</label> 
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label>Password</label> 
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>} {/* Only display error if message exists */}
        <button type="submit">Login</button> 
      </form>
      {/* Link to registration page */}
      <p>
        New to Victorian Books?
        <span className="register-link">
          <Link to="/register"> Please enroll here.</Link>
        </span>
      </p> 
    </div>
  );
};

export default Login;
