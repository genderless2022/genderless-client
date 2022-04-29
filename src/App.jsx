import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { DetailProduct } from './components/DetailProduct/DetailProduct';
import Landing from './components/Landing/Landing';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';


function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<Landing />} />


        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productoid" element={<DetailProduct />} />

      </Routes>
    </div>
  );
}

export default App;
