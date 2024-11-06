import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register'; 
import Dashboard from './pages/dashboard'; 
import Navbar from './pages/navbar'; 
import Footer from './pages/footer'; 
import Insert from './pages/insert'; 

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/insert" element={<Insert />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
