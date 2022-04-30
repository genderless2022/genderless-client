import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AdminCreate } from './components/AdminCreate/AdminCreate';
import { AdminEdit } from './components/AdminEdit/AdminEdit';
import AdminHome from './components/AdminHome/AdminHome';
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
        <Route path="/producto/:id" element={<DetailProduct />} />

        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/create" element={<AdminCreate />} />

      </Routes>
    </div>
  );
}

export default App;
