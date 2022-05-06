import React from 'react'
import './CardSlim.css';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { QuantityCart, deleteSubtotal } from '../../redux/actions/productActions';



//ver si no tiene descuento
//agregar descuento en productos
function CardSlim({ image, name, size, color, stock, price, index, discount }) {
//   const dispatch = useDispatch();
  const [count, setCount] = useState(1);

  const subtotal = Number((((1-(discount/100))*price)*count).toFixed(2));
  console.log('subtotal', subtotal)
  const producto = {
    image,
    size,
    name,
    color,
    quantity : count,
    subtotal,
  }

  const data = [index, producto];
  let dispatch = useDispatch()
  useEffect(() => {
    // dispatch(QuantityCart(data))
  },[dispatch, count]);

  const handleDelete = (e) => {
    //eliminar de la db también
    // dispatch(deleteSubtotal(subtotal))
  }

  return (
    <div className="card-slim-container">
      <div className="card-slim-1">
        <div className="img-slim-card">
          <img className="img-slim" src={ image } alt="imagen rota"></img>
        </div>
        <div className="card-slim-information">
          <div className="name-size">
            <p>{ name }</p>
            <p>Talle: { size }</p>
          </div>
          {
            stock
            ?
          <div className="quantity-stock">
            <div className="Button-quantity">
              <button className="btn-btn" onClick={() => count >= 2 ? setCount(count -1) : console.log('no resta')}>-</button>
              <p className="btn-btn-p">{count}</p>  
              <button className="btn-btn" onClick={() => count < stock ? setCount(count +1) : console.log('no suma')}>+</button>  
            </div>
            <p className="stock-available">{ stock } disponibles</p>
          </div>
            : 
            null
          } 
        </div>
          <div className="price-slim">
            <div>
              {/* {
                discount 
                ? */}
                <div className="price-discount-slim">
                <p>{ discount }%</p>
                <strike>${ (price * count).toFixed(2) }</strike>
              </div>
                {/* : 
                null
              } */}
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