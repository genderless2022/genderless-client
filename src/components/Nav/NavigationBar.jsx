import React from 'react'
import { Button, Container, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavigationBar.css'

function NavigationBar() {

  return (

<Navbar bg="dark" expand="lg">
  <Container fluid>
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
        <Nav.Link href="/login" style={{ maxHeight: '100px', color: 'white' }}>Iniciar sesion</Nav.Link>
        
      </Nav>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Buscar producto"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-warning">Buscar</Button>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>

  )
}

export default NavigationBar