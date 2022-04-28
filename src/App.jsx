import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing/Landing';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import TestRoute from './components/TestRoute/TestRoute';

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/test" element={<TestRoute />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </div>
  );
}

export default App;
