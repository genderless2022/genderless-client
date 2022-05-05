import React, { useEffect } from 'react'
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';
import { Button, Card, Spinner } from 'react-bootstrap';
import { CgShoppingCart } from 'react-icons/cg';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { Link } from 'react-router-dom';
import NavigationBar from '../Nav/NavigationBar';

function Home() {

    const dispatch = useDispatch();
    const productos = useSelector(state => state.productReducer.productos);
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

  return (

    <>
    <NavigationBar/>

    <div className="containerCardsHome">
        {
            productos.length > 0 ?
            productos.map(producto => (
              <Card style={{ width: '18rem', marginBottom: '2%', height: '33rem' }}>
                <Link to={'/producto/' + producto.id} style={{ textDecoration: 'none', color: 'black' }}>
              <Card.Img variant="top" src={producto.image} />
                <Card.Title style={{ height: '55px', marginTop: '2%'}}>{producto.name}</Card.Title>
                </Link>
                 <p style={{ height: '35px' }}>${producto.price}</p> 
                <div className="cardsProductsButtons">
                  <Button className="cardsProductsButton"  style={{ background: 'transparent' ,border: 'none', color: 'black'}}><CgShoppingCart/></Button>
                  <Button className="cardsProductsButton" style={{ background: 'transparent' ,border: 'none', color: 'black'}}> <MdOutlineFavoriteBorder/> </Button>
                </div>
            </Card>
            ))

            :

            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
        }
    </div>
  
    </>
  
  )
}

export default Home