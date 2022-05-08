//import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
// import {getShoppingList} from '../../redux/actions/shoppingCartActions'
import CardSlim from "../../components/CardSlim/CardSlim"
import { Link } from "react-router-dom"
import './ShoppingCart.css'

const ProductosParaMostrar = [
    {"size": "M", "stock":120, "id":1,"name":"Buzo Rip Curl Guard","description":"Buzo Rip Curl Crew Guard. Frisa pesada. Regular fit. Manga básica. Tira tejido retro. Parche logo. Multietiquetas. 88% Algodón 12% Poliester.","stock_by_size":[{"size":"S","stock":1589},{"size":"M","stock":1589},{"size":"L","stock":1589},{"size":"XL","stock":1589},{"size":"XXL","stock":1589}],"price":10999,"discount":10,"image":"https://www.cristobalcolon.com/fullaccess/item21402foto95323th.jpg","brand":"Rip Curl","disabled":false,"createdAt":"2022-05-05T13:34:59.956Z","updatedAt":"2022-05-05T13:35:00.460Z","CategoryName":"Buzo","Category":{"name":"Buzo","createdAt":"2022-05-05T13:35:00.297Z","updatedAt":"2022-05-05T13:35:00.297Z"}},
    {"size": "M", "stock":120, "id":2,"name":"Remera DC Bandana","description":"Remera manga corta DC Bandana. Full print. Jersey 30/1. Regular fit. Avios DC. 100% algodón.","stock_by_size":[{"size":"S","stock":1589},{"size":"M","stock":1589},{"size":"L","stock":1589},{"size":"XL","stock":1589},{"size":"XXL","stock":1589}],"price":9699,"discount":0,"image":"https://www.cristobalcolon.com/fullaccess/item21406foto95347th.jpg","brand":"DC","disabled":false,"createdAt":"2022-05-05T13:34:59.958Z","updatedAt":"2022-05-05T13:35:00.462Z","CategoryName":"Remera","Category":{"name":"Remera","createdAt":"2022-05-05T13:35:00.295Z","updatedAt":"2022-05-05T13:35:00.295Z"}},
    {"stock":120, "id":3,"name":"Remera Rip Curl Pro","description":"Remera Rip Curl Pro. Estampa en espalda, frente y mangas. Standard fit. 100% algodón.","stock_by_size":[{"size":"S","stock":1589},{"size":"M","stock":1589},{"size":"L","stock":1589},{"size":"XL","stock":1589},{"size":"XXL","stock":1589}],"price":4999,"discount":0,"image":"https://www.cristobalcolon.com/fullaccess/item21405foto95345.jpg","brand":"Rip Curl","disabled":false,"createdAt":"2022-05-05T13:34:59.958Z","updatedAt":"2022-05-05T13:35:00.389Z","CategoryName":"Remera","Category":{"name":"Remera","createdAt":"2022-05-05T13:35:00.295Z","updatedAt":"2022-05-05T13:35:00.295Z"}},
    {"size": "XXL", "stock":120, "id":4,"name":"Buzo Rip Curl Pro","description":"Buzo Rip Curl Pro. Rústico. Estampa en espalda, frente y brazos. Bolsillo canguro. Capucha con tiras de ajuste. 100% algodón","stock_by_size":[{"size":"S","stock":1589},{"size":"M","stock":1589},{"size":"L","stock":1589},{"size":"XL","stock":1589},{"size":"XXL","stock":1589}],"price":13999,"discount":25,"image":"https://www.cristobalcolon.com/fullaccess/item21404foto95342.jpg","brand":"Rip Curl","disabled":false,"createdAt":"2022-05-05T13:34:59.959Z","updatedAt":"2022-05-05T13:35:00.394Z","CategoryName":"Buzo","Category":{"name":"Buzo","createdAt":"2022-05-05T13:35:00.297Z","updatedAt":"2022-05-05T13:35:00.297Z"}},
    {"stock":120, "id":5,"name":"Remera Zoo York Immergruen","description":" Remera Zoo York Immergruen. Jersey 100% algodón. Over size fit. Estampa logo.","stock_by_size":[{"size":"S","stock":1589},{"size":"M","stock":1589},{"size":"L","stock":1589},{"size":"XL","stock":1589},{"size":"XXL","stock":1589}],"price":3999,"discount":15,"image":"https://www.cristobalcolon.com/fullaccess/item21385foto95276.jpg","brand":"Zoo York","disabled":false,"createdAt":"2022-05-05T13:34:59.959Z","updatedAt":"2022-05-05T13:35:00.399Z","CategoryName":"Remera","Category":{"name":"Remera","createdAt":"2022-05-05T13:35:00.295Z","updatedAt":"2022-05-05T13:35:00.295Z"}},
    {"size": 23, "stock":120, "id":6,"name":"Pantalon Circa Chino","description":"Pantalon Circa Chino de gabardina, tiro medio, bolsillos laterales y traseros invisibles","stock_by_size":[{"size":"30","stock":1589},{"size":"32","stock":1589},{"size":"34","stock":1589},{"size":"36","stock":1589},{"size":"38","stock":1589}],"price":9699,"discount":0,"image":"https://www.cristobalcolon.com/fullaccess/item21339foto95127.jpg","brand":"Circa","disabled":false,"createdAt":"2022-05-05T13:34:59.959Z","updatedAt":"2022-05-05T13:35:00.396Z","CategoryName":"Pantalon","Category":{"name":"Pantalon","createdAt":"2022-05-05T13:35:00.302Z","updatedAt":"2022-05-05T13:35:00.302Z"}}]

export default function ShoppingCart ( ) {
    
    let nav = useNavigate()
    const status = useSelector( state => state )
    const dispatch = useDispatch()
    const [select, setSelect] = useState("Retiro por la tienda");
    // const [count, setCount] = useState(3);
    // const subtotal = useSelector((state) => state.productReducer.totalCart);
    // const status = useSelector((state) => state.productReducer.status);
    // const subtotalCards = subtotal?.map((card) => card.subtotal)
    // const total = subtotalCards?.reduce((a,b) => a + b);

    // const total = subtotalCards?.reduce((a,b) => a + b).toFixed(2);
    // useEffect(() => {
    // console.log('subtotal', subtotal)
    // console.log('total useEffect', total)
    //     // dispatch(pruebaAction())
    // })
    // {quantity:2, price: 69.00, name: "Zapatillas nike", size:"", color:"" img:""}

    const handleSelect = (e) => {
        console.log('e.target.value', e.target.value)
        setSelect(e.target.value);
    }

    const handleMercadoPago = () => {
        console.log('CONTINUAR')
        // setCount(0);
    }

    const handleEthereum = () => {
        console.log('CONTINUAR')
        nav('/meta/checkout')
    }

    useEffect( ( )=> {
        console.log( 'GETTING SHOPPING LIST')


    async function addShoppingCart  (){ 
            // console.log("ASOCIANDO: "+usuario?.email)
            // await axios.post('http://localhost:3001/usuario/shopping', { productId: Number(60), userEmail: usuario?.email}).then( response => {
            //   console.log(response.data)
            //   dispatch({ type: 'ADD_PRODUCT', payload: response.data })
            // },
            // (error) => console.log(error))
    }
        
        // dispatch(getShoppingList({ email: user.status.user.email }))

        // const productosCarrito = axios.get('http://localhost:3001/usuario/shopping', { email: userValidated?.email }).then(response => {
        //     console.log(response.data)
        //     console.log(status.shoppingCartReducer)
        //     return status.shoppingCartReducer.productos?.msg
        // })
    }, [])
    
    // const ProductosParaMostrar = status.shoppingCartReducer.productos?.msg
    // let state = useSelector( state => state.shoppingCartReducer  )    

    return (<div>
            
            {
                ProductosParaMostrar
                && 
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
                    { ProductosParaMostrar && ProductosParaMostrar?.map((product, i) => {
                    return <CardSlim 
                    key= { i }
                    index= { i }
                    image= { product?.image }
                    name= { product?.name }
                    size= { product?.size }
                    color= { product?.color }
                    stock= { product?.stock }
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
                            <p>$25500</p>
                        </div>
                    </div>
                    <div className="cart-mp">
                        <p>Ir a pagar</p>
                        {/* <Link to="/user/products/pay"> */}
                        {/* <div className="div-btn-mp"> */}
                            <button className="mpButton" onClick={() => handleMercadoPago()}>
                                {<img className="img-mp-cart" src={"https://www.lentesplus.com/media/wysiwyg/landings/metodos-de-pago/ico_mercadoPago.png"} alt="" />}
                            </button>
                            <button className="mpButton" onClick={() => handleEthereum()}>
                                {<img className="img-mp-cart" src={"https://pngset.com/images/ethereum-logo-ethereum-triangle-transparent-png-1170181.png"} alt="" />}
                            </button>
                        {/* </Link> */}
                        {/* </div> */}
                    </div>
                </div>
        </div>
    </div>
                
            }    
    </div>)
}