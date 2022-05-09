import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';
import facebook from '../../assets/social-facebook.png';
import instagram from '../../assets/social-instagram.png'
import terminos from '../../assets/terminos.png';
import localizacion from '../../assets/localizacion.png';
import email from '../../assets/email.png'
//import GENDERLESS from '../../assets/GENDERLESS.png';

function Footer() {
  const {pathname} = window.location;

  return (!pathname.includes("admin")  &&
    <div className="footer">
      <div className="footer-container">
      {/* <img src={GENDERLESS} alt=" " width={200} /> */}
        
        <div className='titleFooter' style={{ maxHeight: '100px', color: 'white' }}>GENDERLESS</div>
        <div>
          <Link to={'/terminos'} className='link-footer' style={{ maxHeight: '100px', color: 'black' }} >
            <p>Terminos y condiciones</p>
            <img src={terminos} color="black" alt=" " width={25} />
          </Link>
        </div>

        <div className='footer-container'>
          <a className='link-footer' target="_blank" style={{ maxHeight: '100px', color: 'black' }}
            href="https://www.facebook.com/profile.php?id=100081210152105">
            <p>Facebook</p>
            <img src={facebook} alt=" " width={30} />
          </a>
        </div>

        <div className='footer-container'>
          <a className='link-footer' target="_blank" style={{ maxHeight: '100px', color: 'black' }}
            href="http://www.instagram.com/genderless_ropa"><p>Instagram</p>
            <img src={instagram} alt=" " width={30} />
          </a>
        </div>

        <div>
          <Link to="/mapa" className='link-footer' style={{ maxHeight: '100px', color: 'black' }}>
            <p>Visítanos en nuestra tienda</p>
            <img src={localizacion} alt=" " className='email' width={30} />
          </Link>
        </div>

        <div className='footer-container'>
          <a className='link-footer' style={{ maxHeight: '100px', color: 'black' }}
            href="mailto:genderless2022@gmail.com">
            <p>Reclamos o sugerencias</p>
            <img src={email} alt=" " className='email' width={30} />
          </a>
        </div>

      </div>
    </div>
        
        )
}

export default Footer