import axios from 'axios';

export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const ERROR = 'ERROR';

// Habilitada
export const getUsers = () => async (dispatch) => {
  axios.get('http://localhost:3001/usuarios').then(
    (response) => {
      dispatch({
        type: GET_USERS,
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
export const getUser = ( email ) => async ( dispatch ) => {
  axios.get(`http://localhost:3001/usuario/email/${email}`).then(
    (response) => {
      dispatch({
        type: GET_USER,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  )
}

// Habilitada
export const createUser = ({
  name, lastName, picture, born, dni, email, address, province, phone, postal, password, permission = 'user',
}) => async (dispatch) => {
  axios.post('http://localhost:3001/usuario', {
    name,
    lastName,
    picture,
    born,
    dni,
    email,
    address,
    province,
    phone,
    postal,
    password,
    permission,
  }).then(
    (response) => {
      dispatch({
        type: CREATE_USER,
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
