import axios from 'axios';

export const MERCADO_CHECKOUT = 'MERCADO_CHECKOUT';

export const ERROR = 'ERROR';

// Habilitada
export const mercadoCheckout = ({
    name, picture_url, size, price, quantity
}) => async (dispatch) => {
  await axios.post('http://localhost:3001/mercado/checkout', {
      name,
      picture_url,
      size,
      price,
      quantity
  }).then(
    (response) => {
      dispatch({
        type: MERCADO_CHECKOUT,
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

