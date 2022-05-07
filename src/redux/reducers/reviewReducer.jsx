import { DELETE_REVIEW_BY_ID, DELETE_USER_REVIEWS, ERROR, GET_PRODUCT_REVIEWS, GET_REVIEWS, POST_REVIEW } from "../actions/reviewActions";

  
  const initialState = {
    status: '',
  };
  function reviewActions( state = initialState, action) {
    switch (action.type) {
      case POST_REVIEW:
        return { ...state, status: action.payload };
      case GET_REVIEWS:
        return { ...state, status: action.payload };
      case GET_PRODUCT_REVIEWS:
        return { ...state, status: action.payload };
      case DELETE_REVIEW_BY_ID:
        return { ...state, status: action.payload };
      case DELETE_USER_REVIEWS:
        return { ...state, status: action.payload };
     

      case ERROR:
        return { ...state, status: action.payload };
  
      default:
        return { ...state };
    }
  }
  export default reviewActions;
  