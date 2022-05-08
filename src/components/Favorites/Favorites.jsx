
import './Favorites.css';
import { useEffect } from 'react';
// import { Link } from "react-router-dom";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from '../../redux/actions/favoritesActions';
import CardFavorites from '../CardFavorites/CardFavorites';

export default function Favorites ( ) {
    const productsFavorites = useSelector( state => state.favoriteReducer.favorites)
    const dispatch = useDispatch()
    
    console.log('productsFavorites', productsFavorites)
    useEffect(()=> {
        dispatch(getFavorites({ email : "maximilianosorichetti@gmail.com" }))
    }, [])

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
                        </div>
                </div>
            </div>
            : <div>No se encuentran productos en Favoritos</div>              
        }

    </>)
}