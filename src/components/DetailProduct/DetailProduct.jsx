import './DetailProduct.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getProduct } from "../../redux/actions/productActions"
import { addfavProduct, deletefavProduct, getFavorites } from '../../redux/actions/favoritesActions';
import { addProduct } from '../../redux/actions/shoppingActions';
import { BsSuitHeartFill } from 'react-icons/bs';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { TiArrowBack } from 'react-icons/ti';
import { Button, Card, Container, Form, FormControl, InputGroup } from 'react-bootstrap'
import axios from 'axios'
import Cookies from 'universal-cookie';
import { postReview } from '../../redux/actions/reviewActions'


const DetailProduct = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const product = useSelector( (state) => state.productReducer.producto)
    // const user = useSelector( (state) => state.userReducer.user)
    const [show, setShow] = useState("")
    const [sizeSelect, setSizeSelect] = useState(null)
    const [favorite, setFavorite] = useState(false)
    const cookies = new Cookies();
    const user = cookies.get('user').user
    console.log(user)
    
    const productsFavorites = useSelector( state => state.favoriteReducer.favorites)
    const productInFavorites = productsFavorites.filter(p=> p.id == id)

    // let cookie = new Cookies();

    useEffect(() => {
        dispatch(getFavorites({ email : user?.email })) 
        dispatch(getProduct(id))
    }, [dispatch, id])
    
    const addShoppingCart = () => { 
        dispatch(addProduct({ email: user?.email, productId: Number(id), size:sizeSelect }))
        setShow("Añadido al carrito")

    }
    // console.log(user.email, '<-')
    // console.log('productInFavorites', productInFavorites)
    // console.log(Number(id), '<-')

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

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const [input, setInput] = useState({
      description: "",
    });

    function handleSubmit(event) {
      event.preventDefault();
      console.log(input, "submit");
      console.log(rating, "submit");
      console.log(cookies.get('user'), "cookies submit");
      
      dispatch(postReview({comment: input.description, rating: rating, productTitle: product.name, email: cookies.get('user')?.email, name: cookies.get('user')?.name, lastname: cookies.get('user')?.user?.lastName}))

      setRating(0);
      setHover(0);
      setInput({
        description: "",
      })
    }


    function handleChange(event) {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
    }

    const reviewsFilter = useSelector( (state) => state.reviewReducer?.reviews?.review)
    console.log(reviewsFilter, 'reviews useSelector')
    //const reviesWithName = reviews?.filter(r => r.UserId) 
    //console.log(reviesWithName, 'reviews with name')
    //const reviewsOfTheProduct = reviewsFilter?.filter(r => r.ProductId === product.id)
    //console.log(reviewsOfTheProduct, 'reviews of the product')



    return (
      <>
        <div>
          {product ? (
            <>
              <div className="main-container">
                <div className="detailProduct-container">
                  <div className="title-category">
                    <p> {"Categoría/" + product?.CategoryName} </p>
                    <Link
                      to="/home"
                      style={{ color: "white", fontSize: "20px" }}
                    >
                      <TiArrowBack />
                    </Link>
                  </div>
                  <div className="detail-one">
                    <div className="detail-one-left">
                      <img
                        className="detail-img"
                        src={product.image}
                        alt="zapatilla"
                      />
                    </div>
                    <div className="detail-one-right">
                      <h1 className="detail-one-name"> {product.name} </h1>
                      <div className="detail-one-sku">
                        SKU: Item No. NI_{product.id}{" "}
                      </div>
                      <div className="detail-one-price">${product.price} </div>
                      <div className="detail-one-cards">
                        <img
                          className="detail-img-pagos-eth"
                          src="https://www.profesionalreview.com/wp-content/uploads/2021/05/eth-1024x576.jpg"
                          alt="ethereum"
                        />
                        <img
                          className="detail-img-pagos"
                          src="https://i.pinimg.com/originals/b6/3b/54/b63b54d4f0074710e9dd0f8e6d3c9fbd.jpg"
                          alt="zapatilla"
                        />
                      </div>
                      <div className="detail-size">Talles</div>
                      <div className="detail-one-size">
                        {product.disabled ? (
                          <div className="detail-sizes2-disabled">
                            <span className="sizes2Size">
                              Producto no disponible
                            </span>
                          </div>
                        ) : (
                          <div className="sizesMap">
                            {product.stock_by_size?.map((size, i) => {
                              const sizes = size.size;
                              const selectSize = sizeSelect === sizes;
                              return (
                                <button
                                  key={i}
                                  value="2"
                                  onClick={(e) => handleSize(sizes)}
                                  disabled={!size.stock}
                                  className={
                                    size.stock
                                      ? selectSize
                                        ? "detail-sizes2-selected"
                                        : "detail-sizes2"
                                      : "detail-sizes2-disabled"
                                  }
                                >
                                  <span className="sizes2Size">
                                    {" "}
                                    {size.size}{" "}
                                  </span>
                                  <span className="sizes2NumerOfSize">
                                    ({size.stock}){" "}
                                  </span>
                                  <br />
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <p
                        className={
                          show ? "producto_agregado" : "producto_sinagregar"
                        }
                      >
                        {show === "carrito"
                          ? "🟢 El producto fue agregado al carrito"
                          : "🟢 El producto fue agregado a favoritos"}{" "}
                      </p>
                      <div className="detail-one-buttons">
                        <button
                          disabled={product.disabled}
                          onClick={() => addShoppingCart()}
                          className={
                            product.disabled
                              ? "detail-button-buy-disabled"
                              : "detail-button-buy"
                          }
                        >
                          Agregar al carrito
                        </button>
                        <button
                          onClick={() => addFavorites()}
                          className={
                            favorite
                              ? "detail-button-like-select"
                              : "detail-button-like"
                          }
                          style={{
                            border: "none",
                            background: "none",
                            textDecoration: "none",
                          }}
                        >
                          <BsSuitHeartFill />
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

              <Container style={{ marginTop: "5%" }}>
                <Form onSubmit={handleSubmit}>
                  <InputGroup.Text>Escribe tu review</InputGroup.Text>
                  <FormControl
                    as="textarea"
                    aria-label="With textarea"
                    placeholder="Escribe tu review"
                    name="description"
                    value={input.description}
                    onChange={(event) => handleChange(event)}
                  />

                  <div className="star-rating">
                    {[...Array(5)].map((star, index) => {
                      index += 1;
                      return (
                        <button
                          type="button"
                          key={index}
                          className={index <= (hover || rating) ? "on" : "off"}
                          value={input.rating}
                          name="rating"
                          onChange={(event) => handleChange(event, setRating(index))}
                          onClick={() => setRating(index)}
                          onMouseEnter={() => setHover(index)}
                          onMouseLeave={() => setHover(rating)}
                        >
                          <span className="star">&#9733;</span>
                        </button>
                      );
                    })}
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    style={{ marginTop: "2%" }}
                  >
                    Enviar
                  </Button>
                </Form>
              </Container>

              {
                [reviewsFilter]?.map((review, i) => {
                return (
                  <Container style={{ marginTop: "5%", marginBottom: "5%" }}>
                <Card>
                  <Card.Body>
                    <Card.Title>{review?.name} {review?.lastname}</Card.Title>
                    <Card.Title>{
                    
                    review?.rating === 1 ? <> <AiFillStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/> </>:
                    review?.rating === 2 ? <> <AiFillStar/><AiFillStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/> </>:
                    review?.rating === 3 ? <> <AiFillStar/><AiFillStar/><AiFillStar/><AiOutlineStar/><AiOutlineStar/> </>:
                    review?.rating === 4 ? <> <AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiOutlineStar/> </>:
                    review?.rating === 5 ? <> <AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/> </>:
                    null
                    }</Card.Title>
                    <Card.Text>
                      {review?.comment}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Container>
                )
                })
              }
            </>
          ) : (
            <div className="loading">
              <div class="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
        </div>
      </>
    );
}

export { DetailProduct }