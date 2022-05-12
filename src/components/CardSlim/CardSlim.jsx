import React from 'react'
import './CardSlim.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom"
import { returnProduct, totalDeleteShopping, totalShopping  } from "../../redux/actions/shoppingActions"
import Cookies from "universal-cookie";

function CardSlim({ image, name, size, stock, price, index, discount, id }) {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const subtotal = Number((((1-(discount/100))*price)*count).toFixed(0));
  let cookie = new Cookies();
  const user = cookie.get('user').user

  useEffect(() => {
    dispatch(totalShopping([index, subtotal]))
  },[dispatch, count]);

  const handleDelete = () => {
    dispatch(returnProduct({ email: user?.email, productId: Number(id) }))
    dispatch(totalDeleteShopping(index))
  }

  return (
    <div className="card-slim-container">
      <div className="card-slim-1">
        <div className="img-slim-card">
          <Link to={`/producto/${id}`} style={{ color: 'white' }}>
            <img className="img-slim" src={ image } alt="imagen rota"></img>
          </Link>
        </div>
        <div className="card-slim-information">
          <div className="name-size">
            <Link to={`/producto/${id}`} style={{ color: 'white', textDecoration: 'none'  }}>
              <p>{ name }</p>
            </Link>
            <p>Talle: { size }</p>
          </div>
          {
            stock
            ?
          <div className="quantity-stock">
            <div className="Button-quantity">
              <button className="btn-btn" onClick={() => count >= 2 ? setCount(count -1) : null}>-</button>
              <p className="btn-btn-p">{count}</p>  
              <button className="btn-btn" onClick={() => count < stock ? setCount(count +1) : null}>+</button>  
            </div>
            <p className="stock-available">{ stock } disponibles</p>
          </div>
            : 
            null
          } 
        </div>
          <div className="price-slim">
            <div>
              {
                discount 
                ?
                <div className="price-discount-slim">
                <p>{ discount }%</p>
                <strike>${ (price * count).toFixed(0) }</strike>
              </div>
                : 
                null
              } 
            </div>
            <p className="price-slim-card">${ subtotal }</p>
          </div>
      </div>
      <div className="card-slim-2">
        <button onClick={() => handleDelete()} className="btn-delete-cart"  >{!stock ? "Eliminar de Favoritos" : "Eliminar del carrito"}</button>
      </div>
    </div>
  )
}

export default CardSlim