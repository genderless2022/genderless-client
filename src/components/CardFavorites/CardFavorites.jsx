import { React } from 'react'
import '../CardSlim/CardSlim.css';
import { useDispatch } from "react-redux";
import { deletefavProduct } from '../../redux/actions/favoritesActions';
import { Link } from 'react-router-dom';

function CardFavorites({ image, name, stock_by_size, price, discount, id }) {
    const dispatch = useDispatch()
    const subtotal = Number(((1-(discount/100))*price).toFixed(2));

    const handleDeleteFav = (e) => {
        e.preventDefault();
        dispatch(deletefavProduct({ productId: Number(id), email : "maximilianosorichetti@gmail.com" }))
    }

    const stock = stock_by_size.map((a)=> a.stock).reduce((a,b) => a + b, 0)

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
                </div>
            <div className="quantity-stock">
                <p className="stock-available">{ stock } disponibles</p>
            </div>         
            </div>
            <div className="price-slim">
                <div>
                {
                    discount 
                    ?
                    <div className="price-discount-slim">
                    <p>{ discount }%</p>
                    <strike>${ (price).toFixed(0) }</strike>
                </div>
                    : 
                    null
                } 
            </div>
                <p className="price-slim-card">${ subtotal }</p>
            </div>
        </div>
    <div className="card-slim-2">
        <button onClick={(e) => handleDeleteFav(e)} className="btn-delete-cart">Eliminar de Favoritos</button>
    </div>
    <hr/>
    </div>
    )
}

export default CardFavorites