import { GET_USERS, CREATE_USER, ERROR } from '../actions/userActions';

const initialState = {
  usuarios: [],
  status: '',
  usuario: {},
};
function userReducer(action, state = initialState) {
  switch (action.type) {
    case GET_USERS:
      return { ...state, usuarios: action.payload };
    case CREATE_USER:
      return { ...state, status: action.payload };
    case ERROR:
      return { ...state, status: action.payload };
    default:
      return { ...state };
  }
}
export default userReducer;
