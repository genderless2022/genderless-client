import io from 'socket.io-client';

let socket = io(process.env.REACT_APP_API || "http://localhost:3001");

export default socket;
