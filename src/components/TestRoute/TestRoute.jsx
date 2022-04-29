import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';

// Este componente ha sido creado especialmente para realizar pruebas funcionales

function TestRoute() {
    let dispatch = useDispatch()

    // Declaramos el estado donde se manejarán todos los cambios en Form
    let [state, setState] = useState({
        producto: {
            name: '',
            description: '',
            stock_by_size: [],
            price: '',
            discount: '',
            image: '',
            brand: '',
            disabled: '',
            category: '',
        }
    })

    // Declaramos la variable donde se almacenan los productos traidos
    let productos = useSelector( state => state.productReducer.productos )
    
    // Declaramos la función donde se despacha la acción que trae los productos
    function getAllProducts() {
        dispatch( getProducts() )
    }

    // Declaramos la función donde se maneja el cambio de estado en el form de creación de productos
    function handleProductOnChange(e) {

    }

    return (

        <>
        {/* GET PRODUCTS */}
        <div>Productos:</div>
        <button onClick={ () => getAllProducts()}>GET</button>
        <div>
            { productos && productos?.map( producto => producto.name )}
        </div>


        {/* POST PRODUCT */}
        <form>
            <input type="text" name='name' onChange={ (e) => handleProductOnChange(e)}/>
        </form>

        
        </>
    );
}

export default TestRoute;
