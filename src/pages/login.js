import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css'; // Ensure this file exists

const Login = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate(); 

  const handleLogin = (e) => { 
    e.preventDefault(); 
    if (username === 'admin' && password === 'password') { 
      setErrorMessage(''); 
      navigate('/dashboard'); 
    } else {
      setErrorMessage('Incorrect username or password'); 
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
            value={username}
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
