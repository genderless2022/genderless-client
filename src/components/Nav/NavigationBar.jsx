import React, { useEffect, useState } from 'react'
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductsbyName } from '../../redux/actions/productActions';
import './NavigationBar.css'
import { BiUser } from 'react-icons/bi';
import { RiUserUnfollowLine } from 'react-icons/ri';
import { AiOutlineShopping } from 'react-icons/ai';

function NavigationBar() {

  const user = useSelector( (state) => state.userReducer.usuario)
  const productos = useSelector((state) => state.productReducer.productos);


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
          user.name ?
          <NavDropdown title={<span style={{ color: 'white' }} >{user.name}</span>}id="basic-nav-dropdown">
          <NavDropdown.Item>  <BiUser/> Mi perfil</NavDropdown.Item>
          <NavDropdown.Item>  <AiOutlineShopping/> Mis compras</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>  <RiUserUnfollowLine/> Cerrar sesión</NavDropdown.Item>
          </NavDropdown>
          :

        <Nav.Link href="/login" style={{ maxHeight: '100px', color: 'white' }}>Iniciar sesion</Nav.Link>
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
    </Navbar.Collapse>
  </Container>
</Navbar>

  )
}

export default NavigationBar