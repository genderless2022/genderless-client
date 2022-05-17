import React from 'react'
import CardSucces from '../CardSucces/CardSucces'
// import { useParams } from "react-router-dom"
import './Succes.css'

const objeto = {
    "código/hash": "jkh324jg2kñj5g34kj5l3412g34kjh",
    email: "maxisorichetti@gmail.com",
    // status: "active", //pago (mP)
    status2: "complete", //aprobado, estado del pago
    total: 25000,
    shoppingCart: {"products":[{"id":123,"name":"Buzo Vans Classic","description":"Buzo Vans Classic con capucha, bolsillo canguro 100% algodón","stock_by_size":[{"size":"S","stock":50},{"size":"M","stock":20},{"size":"L","stock":240},{"size":"XL","stock":120},{"size":"XXL","stock":150}],"price":10400,"discount":0,"image":"https://i.imgur.com/OGNJ8VW.jpg","brand":"Vans","disabled":false,"sales":0,"createdAt":"2022-05-17T09:52:29.925Z","updatedAt":"2022-05-17T09:52:33.743Z","CategoryName":"Buzo","UserProduct":{"id":11,"size":"L","quantity":1,"createdAt":"2022-05-17T11:52:28.700Z","updatedAt":"2022-05-17T11:52:31.486Z","UserId":1,"ProductId":123}},{"id":124,"name":"Campera Rip Curl Washed","description":"Campera Rip Curl Washed","stock_by_size":[{"size":"S","stock":0},{"size":"M","stock":0},{"size":"L","stock":1},{"size":"XL","stock":0},{"size":"XXL","stock":0}],"price":19999,"discount":0,"image":"https://i.imgur.com/s8qGD3W.jpg","brand":"Rip Curl","disabled":false,"sales":0,"createdAt":"2022-05-17T09:52:29.940Z","updatedAt":"2022-05-17T09:52:33.754Z","CategoryName":"Campera","UserProduct":{"id":9,"size":"L","quantity":1,"createdAt":"2022-05-17T11:42:21.852Z","updatedAt":"2022-05-17T11:42:21.852Z","UserId":1,"ProductId":124}},{"id":125,"name":"Zapatillas Vans Old Skool","description":"Zapatilla, suede/canvas, ojales metálicos, lengüeta acolchada. Modelo Old Skool. ","stock_by_size":[{"size":"35","stock":500},{"size":"36","stock":300},{"size":"36.5","stock":240},{"size":"37","stock":120},{"size":"38","stock":150},{"size":"39","stock":500},{"size":"40","stock":300},{"size":"41","stock":240},{"size":"42","stock":120},{"size":"43","stock":300},{"size":"44","stock":240},{"size":"45","stock":120}],"price":15300,"discount":0,"image":"https://i.imgur.com/BUMjbE0.jpg","brand":"Vans","disabled":false,"sales":0,"createdAt":"2022-05-17T09:52:29.941Z","updatedAt":"2022-05-17T09:52:33.757Z","CategoryName":"Calzado","UserProduct":{"id":10,"size":"36","quantity":1,"createdAt":"2022-05-17T11:52:25.739Z","updatedAt":"2022-05-17T11:52:31.602Z","UserId":1,"ProductId":125}}],"msg":"Productos encontrados"}
}

console.log('objeto', objeto)
function Succes() {
    // const { id } = useParams()

    return (
        <div className="succes-container" >
            <div className="succes-container-inside" >
            <h1>Datos de tu orden</h1>
            <div className="container-1">
                <p>Email: {objeto.email}</p>
                <p>Total: ${objeto.total}</p>
                <p>Estado del pago: {objeto.status}</p>
                <p>Estado de la orden: {objeto.status2}</p>
            </div>
            <div className="title-list-succes">
                <h3 style={{"margin-top": "20px"}}>Lista de productos:</h3>
            </div>
            <div className="container-2">
                <div>
                    {
                        objeto.shoppingCart.products?.map((product,i) => {
                            return <CardSucces 
                                key= { i }
                                id= { product?.id }
                                index= { i }
                                image= { product?.image }
                                name= { product?.name }
                                size= { product?.UserProduct.size }
                                quantity= {product?.UserProduct.quantity}
                                discount= { product?.discount }
                                price= { product?.price }
                            />
                        })
                    }
                </div>
            </div>
            <h4 style={{"margin-top": "20px"}}>Gracias por confiar en nosotros!</h4>
        </div>
    </div>
    )
}

export default Succes