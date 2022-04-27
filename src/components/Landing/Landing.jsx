import React from 'react';
import 'antd/dist/antd.css';
import './Landing.css';
import {
  Carousel, Col, Image,
} from 'antd';

function Landing() {
  return (

    <>

      <Carousel autoplay>
        <div>
          <img src="https://www.cristobalcolon.com/fullaccess/banner480.jpg" alt="" width="100%" height="500px" />
        </div>
        <div>
          <img src="https://www.cristobalcolon.com/fullaccess/banner491.jpg" alt="" width="100%" height="500px" />
        </div>
        <div>
          <img src="https://www.cristobalcolon.com/fullaccess/banner485.jpg" alt="" width="100%" height="500px" />
        </div>
        <div>
          <img src="https://www.cristobalcolon.com/fullaccess/banner487.jpg" alt="" width="100%" height="500px" />
        </div>
      </Carousel>

      <div style={{ margin: '5% auto' }} />

      <Col>
        <Image preview={false} height={500} src="https://cdn.dynamicyield.com/api/8767611/images/228af38836c79__lacoste_fw22-dafiti-brandstore_hombre.png" />
        <Image preview={false} height={500} src="https://cdn.dynamicyield.com/api/8767611/images/1879a5a92769e__lacoste_fw22-dafiti-brandstore_polos.png" />
      </Col>

      <Col>
        <Image preview={false} height={500} src="https://cdn.dynamicyield.com/api/8767611/images/2ea7129f4f4b4__lacoste_fw22-dafiti-brandstore_abrigos.png" />
        <Image preview={false} height={500} src="https://cdn.dynamicyield.com/api/8767611/images/11aa4f686cd92__lacoste_fw22-dafiti-brandstore_mujer.png" />
      </Col>

      <div style={{ margin: '5% auto' }}>
        <br />
      </div>

      <Col>
        <Image preview={false} width="90%" height={500} src="https://cdn.dynamicyield.com/api/8767611/images/2cdc9cc71a0d5__tascani_fw22-main.jpg" />
      </Col>

      <div style={{ margin: '5% auto' }}>
        <br />
      </div>
    </>
  );
}

export default Landing;
