import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './register.css';

const Register = () => { 
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate(); 

  const handleRegister = async (e) => { 
    e.preventDefault(); 
    setErrorMessage(''); 
  
    if (!username || !password || !confirmPassword) { 
      setErrorMessage('Please make sure all fields are completed.'); 
      return; 
    }
  
    if (password !== confirmPassword) { 
      setErrorMessage('The passwords entered do not match.'); 
      return; 
    }
  
    try {
      const response = await fetch('http://localhost:3003/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, email: `${username}@example.com`, password }),
      });
      console.log(response)
      if (response.ok) {
        // Navigate to the dashboard on successful registration
        navigate('/dashboard'); 
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'An error occurred during registration.');
      }
    } catch (error) {
      setErrorMessage('An error occurred during registration.');
      console.error(error);
    }
  };

  return (
    <div className="auth-screen register-screen">
      <div className="caution-tape"></div>
      <h1>Register</h1> 
      <form onSubmit={handleRegister}> {/* Form element that triggers handleRegister on submit */}
        <div>
          <label>Username</label> 
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div>
          <label>Password</label> 
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <div>
          <label>Confirm Password</label> 
          <input 
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>} {/* Displays the error message if it exists */}
        <button type="submit">Sign up</button> 
      </form>
    </div>
  );
};

export default Register; 
