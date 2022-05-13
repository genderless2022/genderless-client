import io from 'socket.io-client';

let socketServer = io(process.env.REACT_APP_API || "http://localhost:3001");

export default socketServer;
