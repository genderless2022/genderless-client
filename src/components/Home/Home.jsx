import React, { useEffect, useState } from 'react'
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getProductsbyCategory, getProductsbyPrice } from '../../redux/actions/productActions';
import { Alert, Button, Card, Container, Nav, Navbar, NavDropdown, Pagination, Spinner } from 'react-bootstrap';
import { CgShoppingCart } from 'react-icons/cg';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import NavigationBar from '../Nav/NavigationBar';
import Paged from '../Pagination/Pagination';

function Home({alert, setAlert}) {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productReducer.productos.reverse());
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  console.log(productos);

  
  /**
   //!--------- PAGINADO ----------------------------------
   **/
  const [currentPage, setCurrentPage] = useState(1);
  const [prodPerPage] = useState(15);
  const lastIndexProd = currentPage * prodPerPage;
  const firstIndexProd = lastIndexProd - prodPerPage;
  const currentProds = productos.slice(firstIndexProd, lastIndexProd);
  const prodsFinal = currentProds.filter(p => p.disabled === false);
  console.log(currentProds);
  const Page = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const filterCategory = (category) => {
    dispatch(getProductsbyCategory(category));
    setAlert(false);
  };
  
  const filterPrice = (format) => {
    dispatch(getProductsbyPrice(format));
    setAlert(false);
  };
  




  return (
    <>

    {/* <NavigationBar/> */}

      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <NavDropdown title="Categorias" id="basic-nav-dropdown">
                <NavDropdown.Item  onClick={() => dispatch(getProducts())}>Todos</NavDropdown.Item>
                <NavDropdown.Item  onClick={() => filterCategory('Buzo')}>
                  Buzos
                </NavDropdown.Item>
                <NavDropdown.Item  onClick={() => filterCategory('Remera')}>
                  Remeras
                </NavDropdown.Item>
                <NavDropdown.Item  onClick={() => filterCategory('Campera')}>
                  Camperas
                </NavDropdown.Item>
                <NavDropdown.Item  onClick={() => filterCategory('Pantalon')}>
                  Pantalones
                </NavDropdown.Item>

              </NavDropdown>



              <NavDropdown title="Precio" id="basic-nav-dropdown">
                <NavDropdown.Item  onClick={() => dispatch(getProducts())}>Todos</NavDropdown.Item>
                <NavDropdown.Item  onClick={() => filterPrice('ASC')}>
                ASC
                </NavDropdown.Item>
                <NavDropdown.Item  onClick={() => filterPrice('DESC')}>
                DESC
                </NavDropdown.Item>

              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className={alert === true ? 'alertTrue' : 'alertFalse'}>
        <h1>No hay productos para mostrar</h1>
      </Container>


      <div className="containerCardsHome">
        {productos.length !== 0 ? (
          prodsFinal.map((producto) => (
            <>
              <Card
                style={{ width: "18rem", marginBottom: "2%", height: "33rem" }}
                key={producto.id}
              >
                <Link
                  to={"/producto/" + producto.id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Card.Img variant="top" src={producto.image} style={{ height: "350px"}}/>
                  <Card.Title style={{ height: "55px", marginTop: "2%" }}>
                    {producto.name}
                  </Card.Title>

                </Link>
                <p style={{ height: "35px" }}>${producto.price}</p>
                <div className="cardsProductsButtons">
                  <Button
                    className="cardsProductsButton"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "black",
                    }}
                  >
                    <CgShoppingCart />
                  </Button>
                  <Button
                    className="cardsProductsButton"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "black",
                    }}
                  >
                    {" "}
                    <MdOutlineFavoriteBorder />{" "}
                  </Button>
                </div>
              </Card>
            </>
          ))
        ) : 
        
            
        <>

                    {
                      alert === true ? 
                      null
                      :

                      <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    }
      
       
        </>
        }
      </div>
      <div className={"PagedHome"}>
        <Paged
          prodPerPage={prodPerPage}
          prodsLength={productos.length}
          Page={Page}
        />
      </div>
    </>
  );
}

export default Home