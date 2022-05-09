import './ShoppingCart.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
// import {getShoppingList} from '../../redux/actions/shoppingCartActions'
import { getShopping } from '../../redux/actions/shoppingActions'
import CardSlim from "../../components/CardSlim/CardSlim"
import { Link } from "react-router-dom"
import Cookies from "universal-cookie";

export default function ShoppingCart ( ) {

    
    let nav = useNavigate()
    const status = useSelector( state => state )

    let cookie = new Cookies();
    // const user = cookie.get('user')
    const user = cookie.get('user').user
    console.log(user)
    const dispatch = useDispatch()
    const [select, setSelect] = useState("Retiro por la tienda");
    const shopping = useSelector( state => state.shoppingReducer)
    const total = shopping.totalShopping.length 
                ? shopping.totalShopping?.reduce((a,b) => a + b).toFixed(2)
                : 0;

    useEffect( ( )=> {
        dispatch(getShopping({ email : user?.email }))
    }, [dispatch])
    console.log(user.email, '>-')
    const handleSelect = (e) => {
        setSelect(e.target.value);
    }

    const handleMercadoPago = () => {
        console.log('CONTINUAR')
        // http://localhost:3001/mercado/checkout
    }

    const handleEthereum = () => {
        console.log('CONTINUAR')
        nav('/meta/checkout')
    }

    // console.log('shopping.totalShopping', shopping?.totalShopping)
    //falta el size y quantity, pasar al reducer y manejarlo? si reinicio se pierde... 
    const data = {
        name: shopping.products.map((e) => e.name),
        picture_url: shopping.products.map((e) => e.image),
        size: ["S", "XXL", "L"],
        price: total,
        quantity: [1, 3, 3]
        // name: ["remera azul", "remera roja", "remera gris"],
        // picture_url: ['https://www.cristobalcolon.com/fullaccess/item21385foto95276.jpg,https://www.cristobalcolon.com/fullaccess/item21405foto95345.jpg','https://www.cristobalcolon.com/fullaccess/item21385foto95276.jpg,https://www.cristobalcolon.com/fullaccess/item21405foto95345.jpg'],
        // size: ["S", "XXL", "L"],
        // price: [1234,12123, 23123],
        // quantity: [1, 3, 3]
    }

    return (<div>
            {
                shopping.products.length
                ? 
                    <div className="shopping-cart-container">
                        <div className="into-container">
                            <div className="cart-container-1">
                                <div className="title-container">
                                    <h2>¿Cómo querés recibir o retirar tu compra?</h2>
                                    <select className="select-cart" onClick={(e) => handleSelect(e)}>
                                        <option>Seleccionar opción</option>
                                        <option>Retiro por la tienda</option>
                                        <option>Enviar a mi domicilio</option>
                                        
                                    </select>
                                </div>
                                
                                <div>
                                    {
                                    select === "Enviar a mi domicilio"?
                                        
                                <div className="card-send">
                                    <div className="img-send-card">
                                    <img className="img-send" src="https://cdn-icons-png.flaticon.com/512/535/535239.png" alt="imagen rota"></img>
                                    </div>
                                    <div className="cart-slim-information">
                                    <div className="name-size">
                                        <p>Direccion: CALLE FALSA 123</p>
                                        <p>CP: 1415 - CABA </p>
                                        <p>OSCAR GARCIA - 1512323324</p>
                                    </div>
                                    </div>
                                    <div className="cart-edit">
                                        <div className="price-discount-slim">
                                            <Link to="/user/products/send">
                                            <p> Editar campo </p>
                                            </Link>
                                    </div>
                                    </div>
                                </div>
                                    :null
                                    
                                    }
                                </div>
                                    { shopping.products && shopping.products?.map((product, i) => {
                                    const stock = product?.stock_by_size.map((a)=> a.stock).reduce((a,b) => a + b, 0)

                                    return <CardSlim 
                                    key= { i }
                                    id= { product?.id }
                                    index= { i }
                                    image= { product?.image }
                                    name= { product?.name }
                                    size= { product?.size }
                                    color= { product?.color }
                                    stock= { stock }
                                    discount= { product?.discount }
                                    price= { product?.price }
                                    />
                                })}
                                </div>
                                <div className="resume-count">
                                    <div className="cart-container-2">
                                        <h3>Resumen de compra</h3>
                                        <hr/>
                                        <div className="cart-price-send">
                                            <h4>Envío gratis</h4>
                                            <h4>$0</h4>
                                        </div>
                                        <hr/>        
                                        <div className="cart-total-products">
                                            <h4>TOTAL:</h4>
                                            <h4>${ total }</h4>
                                        </div>
                                    </div>
                                    <div className="cart-mp">
                                        <p>Ir a pagar</p>
                                            <form className="form-mp" action='http://localhost:3001/mercado/checkout' method='POST'>
                                            <input type='hidden' name='name' value={data.name}></input>
                                            <input type='hidden' name='picture_url' value={data.picture_url}></input>
                                            <input type='hidden' name='size' value={data.size} ></input>
                                            <input type='hidden' name='price' value={data.price} ></input>
                                            <input type='hidden' name='quantity' value={data.quantity} ></input>
                                        <button className="mpButton" type="submit" onClick={() => handleMercadoPago()}>
                                            {<img className="img-mp-cart" src={"https://www.lentesplus.com/media/wysiwyg/landings/metodos-de-pago/ico_mercadoPago.png"} alt="" />}
                                        </button>
                                        </form>

                                        <button className="mpButton" onClick={() => handleEthereum()}>
                                            {<img className="img-mp-cart" src={"https://pngset.com/images/ethereum-logo-ethereum-triangle-transparent-png-1170181.png"} alt="" />}
                                        </button>
                                    </div>
                                </div>
                        </div>
                    </div>
                :
                <div className="shopping-cart-container">El carrito se encuentra vacío</div>
            }    
    </div>)
}