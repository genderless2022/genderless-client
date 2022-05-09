import './DetailProduct.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getProduct } from "../../redux/actions/productActions"
import { addfavProduct, deletefavProduct, getFavorites } from '../../redux/actions/favoritesActions';
import { addProduct } from '../../redux/actions/shoppingActions';
import { BsSuitHeartFill } from 'react-icons/bs';
import { TiArrowBack } from 'react-icons/ti';
import Cookies from "universal-cookie";

const DetailProduct = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const product = useSelector( (state) => state.productReducer.producto)
    const productsFavorites = useSelector( state => state.favoriteReducer.favorites)
    const productInFavorites = productsFavorites.filter(p=> p.id == id)
    const [show, setShow] = useState("")
    const [sizeSelect, setSizeSelect] = useState(null)
    const [favorite, setFavorite] = useState(productInFavorites.length)
    let cookie = new Cookies();
    const user = cookie.get('user')

    useEffect(() => {
        dispatch(getFavorites({ email : user?.email })) 
        dispatch(getProduct(id))
    }, [dispatch, id])
    
    const addShoppingCart = () => { 
        dispatch(addProduct({ email: user?.email, productId: Number(id), size:sizeSelect }))
        setShow("Añadido al carrito")
    }

    console.log('productInFavorites', productInFavorites)

    const addFavorites = () => { 
        setFavorite(!favorite)
        // console.log('favorite', favorite)
        if(!favorite) {
            dispatch(addfavProduct({ email: user?.email, productId: Number(id) }))
            setShow("Añadido a favoritos")
        }else {
            dispatch(deletefavProduct({ email: user?.email, productId: Number(id) }))
            setShow("Eliminado de favoritos")
        }
    }

    const handleSize = (sizes) => {
        setSizeSelect(sizes);
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
                                <Link to='/home' style={{ color: 'white', fontSize: '20px' }}>
                                    <TiArrowBack/>
                                </Link>
                            </div>
                            <div className="detail-one">
                                <div className="detail-one-left">
                                    <img className="detail-img" src={product.image} alt="zapatilla" />
                                </div>
                                <div className="detail-one-right">
                                    <h1 className="detail-one-name"> {product.name} </h1>
                                    <div className="detail-one-sku">SKU: Item No. NI_{product.id}  </div>
                                    <div className="detail-one-price">${product.price} </div>
                                    <div className="detail-one-cards">
                                        <img className="detail-img-pagos-eth" src="https://www.profesionalreview.com/wp-content/uploads/2021/05/eth-1024x576.jpg" alt="ethereum" />
                                        <img className="detail-img-pagos" src="https://i.pinimg.com/originals/b6/3b/54/b63b54d4f0074710e9dd0f8e6d3c9fbd.jpg" alt="zapatilla" />
                                    </div>
                                    <div className="detail-size">Talles</div>
                                    <div className="detail-one-size">
                                        {product.disabled
                                            ? 
                                            <div className= "detail-sizes2-disabled">
                                                <span className="sizes2Size">Producto no disponible</span>
                                            </div> 
                                            : 
                                            <div className="sizesMap">
                                                {
                                                    product.stock_by_size?.map((size, i) => {
                                                        const sizes = size.size
                                                        const selectSize = sizeSelect === sizes
                                                        return <button 
                                                                    key={i}
                                                                    value="2"
                                                                    onClick={ (e) => handleSize(sizes)}
                                                                    disabled={!(size.stock)}
                                                                    className= {size.stock ? selectSize ? "detail-sizes2-selected" : "detail-sizes2" : "detail-sizes2-disabled" }
                                                                >
                                                                    <span className="sizes2Size"> {size.size}  </span>
                                                                    <span className="sizes2NumerOfSize">({size.stock}) </span><br />
                                                                </button>
                                                    })
                                                }
                                            </div>
                                        }
                                    </div>
                                    <p className={show ? 'producto_agregado' : 'producto_sinagregar'}>{`🟢 ${show}`}</p>
                                    {/* <p className={show ? 'producto_agregado' : 'producto_sinagregar'}>{show === "carrito" ? "🟢 El producto fue agregado al carrito" :  "🟢 El producto fue agregado a favoritos" } </p> */}
                                    <div className="detail-one-buttons">
                                        <button 
                                        disabled= {product.disabled}
                                        onClick={ () => addShoppingCart()} className={product.disabled ? "detail-button-buy-disabled" : "detail-button-buy" }>
                                            Agregar al carrito
                                        </button>            
                                        <button  onClick={ () => addFavorites()} className={favorite ? "detail-button-like-select" : "detail-button-like"} style={{border: 'none', background: 'none', textDecoration: 'none' }}>
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