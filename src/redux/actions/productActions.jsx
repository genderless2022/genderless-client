import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCT = 'GET_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const DELETE_PRODUCT_ID = 'DELETE_PRODUCT_ID';
export const ERROR = 'ERROR';

export const getProducts = () => async (dispatch) => {
  console.log('GOT')
  axios.get('http://localhost:3001/productos').then(
    (response) => {
      dispatch({
        type: GET_PRODUCTS,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  );
};

export const getProduct = (id) => async (dispatch) => {
  axios.get(`http://localhost:3001/producto/${id}`).then(
    (response) => {
      dispatch({
        type: GET_PRODUCT,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  );
};

export const createProduct = ({
  name, description, size, color, stock, price, discount, image, category,
}) => async (dispatch) => {
  axios.post('http://localhost:3001/productos', {
    name,
    description,
    size,
    color,
    stock,
    price,
    discount,
    image,
    category,
  }).then((response) => {
    dispatch({
      type: CREATE_PRODUCT,
      payload: response.data,
    });
  });
};

export const deleteProduct = (id) => async (dispatch) => {
  axios.delete(`http://localhost:3001/producto/${id}`).then(
    (response) => {
      dispatch({
        type: DELETE_PRODUCT,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  );
};

export const editProduct = (producto) => async (dispatch) => {
  await axios.put('http://localhost:3001/producto/putproduct', producto)
    .then(
      (response) => {
        dispatch({
          type: EDIT_PRODUCT,
          payload: response.data,
        });
      },
      (error) => {
        dispatch({
          type: ERROR,
          payload: error.error,
        });
      },
    );
};
