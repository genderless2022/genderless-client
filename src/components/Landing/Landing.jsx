import React, { useState } from 'react';

import './Landing.css';

import { Link } from 'react-router-dom';
import {  Button, Card, Carousel, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';

function Landing() {


    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
  
    return (

    <>
      
   
      <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <Link to={'/home'}>

        <img
          className="d-block w-100"
          src="https://www.ripcurlargentina.com/fullaccess/banner345.jpg"
          alt="First slide"
          />
          </Link>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Link to={'/home'}>

        <img
          className="d-block w-100"
          src="https://www.ripcurlargentina.com/fullaccess/banner344.jpg"
          alt="Second slide"
          />
          </Link>

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Link to={'/home'}>

        <img
          className="d-block w-100"
          src="https://www.ripcurlargentina.com/fullaccess/banner346.jpg"
          alt="Third slide"
          />
          </Link>

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Link to={'/home'}>

        <img
          className="d-block w-100"
          src="https://www.ripcurlargentina.com/fullaccess/banner343.jpg"
          alt="Fourth slide"
          />
          </Link>

        <Carousel.Caption>
          <h3>Fourth slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    
     
        
        

            
      
            


            
      <Container style={{  display: 'flex', margin: '2% auto', justifyContent: 'center' }}>..
        <Row>
        <Col>
        <div className="wrapper">
        <div className="cardLanding">
        <img className="cardLandingImage" alt=""  preview={false} src="https://cdn.dynamicyield.com/api/8767771/images/87b138afa61f__colorblock_om_promociones_fem.png" />
            <div className="card-container">
            </div>
            <div className="info">
                <p>Buzos</p>
            </div>
        </div>
    </div>
        </Col>

        <Col>

        <div className="wrapper">
        <div className="cardLanding">
        <img className="cardLandingImage" alt="" preview={false} src="https://cdn.dynamicyield.com/api/8767771/images/26d89cab36e4c__adveture_om_promociones_fem.png" />
            <div className="card-container">
            </div>
            <div className="info">
              <p>Camperas</p>
            </div>
        </div>
    </div>

        </Col>

        </Row>

      </Container>
          
        
      <Container style={{  display: 'flex', margin: '2% auto', justifyContent: 'center' }}>
        <Row>
        
        <Col>
        
                 <div className="wrapper">
        <div className="cardLanding">
        <img className="cardLandingImage" alt="" preview={false} src="https://cdn.cliqueinc.com/posts/290170/best-cargo-pants-290170-1605890558176-square.700x0c.jpg" />
            <div className="card-container">
            </div>
            <div className="info">
            <p>Pantalones</p>
            </div>
        </div>
    </div>


        </Col>
        <Col>
        
            <div className="wrapper">
        <div className="cardLanding">
        <img className="cardLandingImage" alt="" preview={false} src="https://cdn.dynamicyield.com/api/8767611/images/163c5ef932a94__onsite_abr22_zapasreef.jpg" />  
            <div className="card-container">
            </div>
            <div className="info">
            <p>Zapatillas</p>
            </div>
        </div>
    </div>
        </Col>

        </Row>


      </Container>


     

              
              

  
    <h3 style={{ margin: '3% auto' }}>Productos destacados</h3>
    
    <Container style={{  display: 'flex',flexWrap: 'wrap', margin: '2% auto'}}>

    <Card style={{ width: '18rem', margin: 'auto 2%' }}>
  <Card.Img variant="top" src="https://www.cristobalcolon.com/fullaccess/item21402foto95323th.jpg" />
  <Card.Body>
    <Card.Title>Buzo Rip Curl Guard'</Card.Title>
    <Card.Text style={{color: 'grey'}}>
      $10.999
    </Card.Text>
    <Button variant="primary">Ver mas</Button>
  </Card.Body>
</Card>


 
  


    <Card style={{ width: '18rem', margin: 'auto 2%' }}>
  <Card.Img variant="top" src="https://www.cristobalcolon.com/fullaccess/item21406foto95347th.jpg" />
  <Card.Body>
    <Card.Title>Remera DC Bandana</Card.Title>
    <Card.Text style={{color: 'grey'}}>
      $9.699
    </Card.Text>
    <Button variant="primary">Ver mas</Button>
  </Card.Body>
</Card>


 
  


    <Card style={{ width: '18rem', margin: 'auto 2%' }}>
  <Card.Img variant="top" src="https://www.cristobalcolon.com/fullaccess/item21385foto95276.jpg" />
  <Card.Body>
    <Card.Title>Remera Zoo York Immergruen</Card.Title>
    <Card.Text style={{color: 'grey'}}>
      $3.999
    </Card.Text>
    <Button variant="primary" >Ver mas</Button>
  </Card.Body>
</Card>


</Container>

 

    </>
  );
}

export default Landing;
