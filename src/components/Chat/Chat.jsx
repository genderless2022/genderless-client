import React, {useState, useEffect, useRef} from 'react'
import socket from '../Socket';
import Cookies from "universal-cookie";


function Chat() {

  let cookie = new Cookies();
  const user = cookie.get('user').user;
       
  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState({
    name: user.name,
    permission: user.permission
  })
  const name = input.name;

  const permission = input.permission;
     
  useEffect(() => {
    socket.emit('Conectado', name, permission)
  },[name, permission]);

  useEffect(() => {
    socket.on('mensajes', data => {
      setMessages([...messages, data]);
    })
    return () => {socket.off()}
  }, [messages]);

  const submit = (e) => {
    e.preventDefault();
    socket.emit('mensaje', name, permission, message);
  } 

  return (
    <div>
      <div>
        {messages.map((mes, i) => {
          return (
            <div key={i}>
              <p>{mes.name}</p>
              <p>{mes.message}</p>
            </div>
          )
        })}
      </div>
      <form onSubmit={submit}>
        <label>Escriba su mensaje</label>
        <textarea value= {message} onChange={(e) => setMessage(e.target.value)}></textarea>
        <button>Enviar</button>
      </form>
    </div>
  )
}

export default Chat