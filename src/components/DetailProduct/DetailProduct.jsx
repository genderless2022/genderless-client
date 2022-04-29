import './DetailProduct.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getProduct } from "../../redux/actions/productActions"
// import { addProductFavorite } from '../../redux/actions/favoriteActions';
// import { addProduct } from '../../redux/actions/shoppingCartActions';
import { BsSuitHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const DetailProduct = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    // const product = useSelector( (state) => state.productReducer.producto)
    const product = {"id":6,"name":"Pantalon Circa Chino","description":"Pantalon Circa Chino de gabardina, tiro medio, bolsillos laterales y traseros invisibles. Pantalon Circa Chino de gabardina, tiro medio, bolsillos laterales y traseros invisibles","stock_by_size":[{"size":"30","stock":589},{"size":"32","stock":589},{"size":"34","stock":589},{"size":"36","stock":589},{"size":"38","stock":589},{"size":"30","stock":589},{"size":"32","stock":589},{"size":"34","stock":589},{"size":"36","stock":589},{"size":"38","stock":589}],"price":9699,"discount":0,"image":"https://www.cristobalcolon.com/fullaccess/item21339foto95127.jpg","brand":"Circa","disabled":false,"createdAt":"2022-04-28T23:24:36.884Z","updatedAt":"2022-04-28T23:24:37.389Z","CategoryName":"Pantalon","Category":{"name":"Pantalon","createdAt":"2022-04-28T23:24:37.230Z","updatedAt":"2022-04-28T23:24:37.230Z"}};

    const [show, setShow] = useState("")

    // useEffect(() => {
    //     dispatch(getProduct(id))
    // }, [dispatch, id])
    
    const addShoppingCart = () => { 
      // dispatch(addProduct({productId : id, userEmail : email}))
        console.log('agregado al Carrito')
        setShow("carrito")
    }

    const addFavorites = () => { 
      // dispatch(addProductFavorite({ productId: Number(id), email: email}))
        console.log('agregado a Favoritos')
        setShow("favoritos")
    }

    return (
        <>
            <div>
                {       
                    product 
                    ? 
                    <div className="main-container">
                        <div className="detailProduct-container">
                            <div className="title-category">
                                <p> {'Categoría/'+product?.CategoryName}  </p>
                            </div>
                            <div className="detail-one">
                                <div className="detail-one-left">
                                    <img className="detail-img" src={product.image} alt="zapatilla" />
                                </div>
                                <div className="detail-one-right">
                                    <h1 className="detail-one-name"> {product.name} </h1>
                                    <div className="detail-one-sku">SKU: Item No. NI_{product.id}  </div>
                                    <div className="detail-one-price">${product.price} </div>
                                    <div className="detail-one-cards">Medios de pago</div>
                                    <div className="detail-size">Talles</div>
                                    <div className="detail-one-size">
                                        <div className="sizesMap">
                                        {
                                            product.stock_by_size.map((size, i) => {
                                                return <div key={i} className="detail-sizes2">
                                                            <span className="sizes2Size"> {size.size}  </span>
                                                                <span className="sizes2NumerOfSize">({size.stock}) </span><br />
                                                        </div>
                                            })
                                        }
                                        
                                        </div>
                                    </div>
                                    <p className={show ? 'producto_agregado' : 'producto_sinagregar'}> 🟢 El producto fue agregado al carrito</p>
                                    <div className="detail-one-buttons">
                                        <button onClick={ () => addShoppingCart()} className="detail-button-buy">
                                            Agregar al carrito
                                        </button>            
                                        <button  onClick={ () => addFavorites()} className="detail-button-like" style={{border: 'none', background: 'none', textDecoration: 'none' }}>
                                            <BsSuitHeartFill/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-two">
                                <div>
                                    <strong>Descripción</strong>
                                </div>
                                <div className="description-right">
                                    <p className="description-top"> {product.description}</p> 
                                    <div className="description-bottom">
                                        <div className="description-bottom-p">
                                            <strong>Marca:</strong> {product.brand} <br />
                                        </div>
                                        <div className="description-bottom-p">
                                            <strong>Color:</strong> Negro <br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                        <div className="loading">
                            <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div>
            }
            </div>
        </>    
    )
}

export { DetailProduct }