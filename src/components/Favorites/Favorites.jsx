
import './Favorites.css';
import { useEffect } from 'react';
// import { Link } from "react-router-dom";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from '../../redux/actions/favoritesActions';
import CardFavorites from '../CardFavorites/CardFavorites';
import { subscribeFavorites } from '../../redux/actions/newsletterActions';
import Cookies from "universal-cookie";

export default function Favorites ( ) {
    let cookie = new Cookies();
    const user = cookie.get('user')
    const productsFavorites = useSelector( state => state.favoriteReducer.favorites)
    const dispatch = useDispatch()
    
    useEffect(()=> {
        dispatch(getFavorites({ email : user?.email }))
    }, [])

    const handleNewsletter = (e) => {
        e.preventDefault();
        dispatch(subscribeFavorites({ email : user?.email }))
    }
    return (<>
        {productsFavorites.length
            ?
            <div className="fav-cart-container">
                <div className="into-container-fav">
                    <div className="cart-container-1">
                        <div className="title-container-fav">
                            <h2>FAVORITOS</h2>
                        </div>
                            { productsFavorites && productsFavorites?.map((product, i) => {
                            return <CardFavorites 
                            key= { i }
                            index= { i }
                            image= { product?.image }
                            name= { product?.name }
                            stock_by_size= { product?.stock_by_size }
                            color= { product?.color }
                            id= { product?.id }
                            stock= { product?.stock }
                            discount= { product?.discount }
                            price= { product?.price }
                            />
                        })}
                        <div className="fav-newsletter-btn">
                            <button onClick={(e) => handleNewsletter(e)} className="btn-newsletter-fav">Agregar a Newsletter mis favoritos</button>
                        </div>
                        </div>

                </div>
            </div>
            : <div>No se encuentran productos en Favoritos</div>              
        }

    </>)
}