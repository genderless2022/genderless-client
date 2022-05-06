import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AdminCreate } from './components/AdminCreate/AdminCreate';
import AdminHome from './components/AdminHome/AdminHome';
import { DetailProduct } from './components/DetailProduct/DetailProduct';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import UserDetail from './components/UserDetail/UserDetail';
import EditUser from './components/EditUser/EditUser';
import AdminDetail from './components/AdminDetail/AdminDetail';
import AdminRegisterEdit from './components/AdminRegisterEdit/AdminRegisterEdit';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
//import Footer from './components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/Nav/NavigationBar';
import ConnectMetamask from './components/ConnectMetamask/ConnectMetamask';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';



function App() {
  return (
    <div className="App">
      <NavigationBar></NavigationBar>
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/producto/:id" element={<DetailProduct />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />

        <Route path="/user/profile" element={<UserDetail></UserDetail>} />
        <Route path="/editar" element={<EditUser></EditUser>} />

        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/create" element={<AdminCreate />} />
        <Route path="/admin/profile" element={<AdminDetail></AdminDetail>} />
        <Route path="/admin/editar" element={<AdminRegisterEdit></AdminRegisterEdit>} />

        
        <Route path="/connect/metamask" element={<ConnectMetamask />} />




      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
