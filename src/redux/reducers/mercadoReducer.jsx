import { MERCADO_CHECKOUT, ERROR } from '../actions/mercadopagoActions';
  
  const initialState = {
    status: '',
  };
  function mercadoReducer( state = initialState, action) {
    switch (action.type) {
      case MERCADO_CHECKOUT:
        return { ...state, status: action.payload };

      case ERROR:
        return { ...state, status: action.payload };
  
      default:
        return { ...state };
    }
  }
  export default mercadoReducer;
  