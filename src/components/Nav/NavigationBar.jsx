import React, { useEffect, useState } from 'react'
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductsbyName } from '../../redux/actions/productActions';
import ConnectMetamask from '../ConnectMetamask/ConnectMetamask';
import './NavigationBar.css'
import { BiUser } from 'react-icons/bi';
import { RiUserUnfollowLine } from 'react-icons/ri';
import { AiOutlineShopping } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';
import Cookies from 'universal-cookie';
import { userLogout } from '../../redux/actions/userActions';

function NavigationBar() {

  const cookies = new Cookies();
  console.log(cookies.get('user'));
  const user = useSelector( (state) => state.userReducer.usuario)
  const productos = useSelector((state) => state.productReducer.productos);

  const nav = useNavigate()
  const logout = () => {
    dispatch(userLogout(cookies.get('user')?.tokenSession))
  }
  console.log(cookies.get('user')?.tokenSession, 'token')

  // Pesadilla de Tomi:
  let [state, setState] = useState({
    wallet: localStorage.getItem('wallet') || null,
    balance: localStorage.getItem('balance') || null
  })
  let wallet = state.wallet
  let balance = state.balance

  useEffect(() => {
    console.log(user)

  }, [user])
  /**
     //!--------- BUSQUEDA ----------------------------------
  **/
     const[name, setName] = useState('')
     const dispatch = useDispatch();


     function handleInputChange(event) {
         event.preventDefault();
         setName(event.target.value.toLowerCase());
         console.log(name, 'HandleChange')
     }
   
     function handleSubmit(event) {
         event.preventDefault();
         dispatch(getProductsbyName(name))
         setName('')
         console.log(name, 'HandleSubmit')
        }


        
        return (

<Navbar bg="dark" expand="lg" >
  <Container fluid >
    <Navbar.Brand className='titleNavBar' style={{ maxHeight: '100px', color: 'white' }}>GENDERLESS</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px', color: 'white' }}
        navbarScroll
      >
        <Nav.Link href="/" style={{ maxHeight: '100px', color: 'white' }}>Inicio</Nav.Link>
        <Nav.Link href="/home" style={{ maxHeight: '100px', color: 'white' }}>Catalogo</Nav.Link>
        {
          cookies.get('user') ?
          <NavDropdown title={<span style={{ color: 'white' }} >{cookies.get('user').user?.name}</span>}id="basic-nav-dropdown">
          <NavDropdown.Item>  <BiUser/> Mi perfil</NavDropdown.Item>
          <NavDropdown.Item>  <AiOutlineShopping/> Mis compras</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item  onClick={() => logout()}>  <RiUserUnfollowLine/> Cerrar sesión</NavDropdown.Item>
          </NavDropdown>
          :

        <Nav.Link href="/login" style={{ maxHeight: '100px', color: 'white' }}>Iniciar sesion</Nav.Link>
      }

        {/* Agregando Componente de Metamask */}
        {/* Agregando Widgetmenu Metamask */}
        { wallet  &&
          <div className='login-meta-container'>
            <ConnectMetamask type= {'widget_menu'} ></ConnectMetamask>
          </div>}
      
        {/* Agregando Login Metamask */}
        { !wallet  &&
          <div className='login-meta-container'>
            <ConnectMetamask type= {'login'} ></ConnectMetamask>
          </div>
        }

      </Nav>
      <Form className="d-flex"  onSubmit={(e) => handleSubmit(e)}>
        <FormControl
          type="search"
          placeholder="Buscar producto"
          className="me-2"
          aria-label="Search"
          value={name}
          onChange={(e) => handleInputChange(e)}
        />
        <Button type="submit" variant="outline-warning">Buscar</Button>
      </Form>

      <div style={{ marginTop: '10px'}}>
        <Link style={{ margin: '40px', color: 'white', textDecoration: 'none', fontSize: '1.3rem' }} to="/shoppingcart">  <FiShoppingCart/></Link>
        <Link style={{ margin: '40px', color: 'white', textDecoration: 'none', fontSize: '1.3rem' }} to="/shoppingcart">  <FaRegHeart/></Link>
      </div>
    </Navbar.Collapse>
  </Container>


</Navbar>

  )
}

export default NavigationBar