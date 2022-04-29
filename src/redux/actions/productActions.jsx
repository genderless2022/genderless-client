import axios from 'axios';

export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCT = 'GET_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const ERROR = 'ERROR';

// Habilitada
export const getProducts = () => async (dispatch) => {
  await axios.get('http://localhost:3001/productos').then(
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

// No Habilitada
export const getProduct = (id) => async (dispatch) => {
  await axios.get(`http://localhost:3001/productos/id/${id}`).then(
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

// Habilitada
export const createProduct = ({ name, description, stock_by_size, price, discount, image, brand, disabled, category,}) => async (dispatch) => {
  await axios.post('http://localhost:3001/productos', {
    name,
    description,
    stock_by_size,
    price,
    discount,
    image,
    brand,
    disabled,
    category,
  }).then((response) => {
    dispatch({
      type: CREATE_PRODUCT,
      payload: response.data,
    });
  });
};


// No Habilitada
export const deleteProduct = (id) => async (dispatch) => {
  await axios.delete(`http://localhost:3001/producto/${id}`).then(
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

// Habilitada
export const editProduct = ({id, description,stock_by_size, price, discount, image, brand, disabled, category }) => async (dispatch) => {
  await axios.put('http://localhost:3001/producto/putproduct', {
    id, 
    description,
    stock_by_size, 
    price, 
    discount, 
    image, 
    brand, 
    disabled, 
    category 
  }).then(
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
