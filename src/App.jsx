import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing/Landing';
import TestRoute from './components/TestRoute/TestRoute';

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/test" element={<TestRoute />} />

      </Routes>
    </div>
  );
}

export default App;
