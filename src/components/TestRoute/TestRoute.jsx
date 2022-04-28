import React from 'react';
import { useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';

function TestRoute() {
    let productos = useSelector( state => state )
    
    function getAllProducts() {
        getProducts()
    }

    return (

        <>
        {/* { productos && productos?.map( producto => producto.name )} */}
        <div>akjschais</div>
        <button onClick={ () => getAllProducts()}>PRODUCTOS</button>
        <button onClick={ () => console.log(productos)}>PRODUCTOS</button>
        </>
    );
}

export default TestRoute;
