import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';

function TestRoute() {
    let productos = useSelector( state => state.productReducer.productos )
    let dispatch = useDispatch()
    
    function getAllProducts() {
        dispatch(getProducts())
    }

    return (

        <>
        <div>Productos:</div>
        <button onClick={ () => getAllProducts()}>GET</button>
        <div>
        { productos && productos?.map( producto => producto.name )}
        </div>

        
        </>
    );
}

export default TestRoute;
