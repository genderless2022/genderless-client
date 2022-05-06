import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';
import facebook from '../../assets/social-facebook.png';
import instagram from '../../assets/social-instagram.png'
import terminos from '../../assets/terminos.png';
import localizacion from '../../assets/localizacion.png';
import email from '../../assets/email.png'

function Footer() {
  const {pathname} = window.location;

  return (!pathname.includes("admin")  &&
    <div className="footer">
      <div className="footer-container">
        <h1>Genderless </h1>

        <div>
          <Link to={'/terminos'} className='link-footer' >
            <p>Terminos y condiciones</p>
            <img src={terminos} alt=" " width={25} />
          </Link>
        </div>

        <div className='footer-container'>
          <a className='link-footer'
            href="https://www.facebook.com/profile.php?id=100080195515452">
            <p>Facebook</p>
            <img src={facebook} alt=" " width={30} />
          </a>
        </div>

        <div className='footer-container'>
          <a className='link-footer'
            href="http://www.instagram.com/boomaropadeportiva"><p>Instagram</p>
            <img src={instagram} alt=" " width={30} />
          </a>
        </div>

        <div>
          <Link to="/map" className='link-footer'>
            <p>Visítanos en nuestra tienda</p>
            <img src={localizacion} alt=" " className='email' width={30} />
          </Link>
        </div>

        <div className='footer-container'>
          <a className='link-footer'
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