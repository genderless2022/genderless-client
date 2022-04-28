import { GET_USERS, GET_USER, CREATE_USER, ERROR } from '../actions/userActions';

const initialState = {
  usuarios: [],
  status: '',
  usuario: {},
};
function userReducer( state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return { ...state, usuarios: action.payload };
    case GET_USER:
      return { ...state, usuario: action.payload };
    case CREATE_USER:
      return { ...state, status: action.payload };
    case ERROR:
      return { ...state, status: action.payload };
    default:
      return { ...state };
  }
}
export default userReducer;
