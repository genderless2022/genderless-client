import React, {useState, useEffect, useRef} from 'react'
// import socket from '../Socket';
import SocketIOClient  from 'socket.io-client';
import Cookies from "universal-cookie";
import socketServer from '../Socket';


// function Chat() {

//   let cookie = new Cookies();
//   const user = cookie.get('user').user;
       
//   const [message, setMessage] = useState('');

//   const [messages, setMessages] = useState([]);
  

//   const [input, setInput] = useState({
//     name: user.name,
//     permission: user.permission
//   })

//   const name = input.name;
//   const permission = input.permission;
     
//   useEffect(() => {
//     socket.emit('Conectado', name, permission)
//   },[name, permission]);

//   useEffect(() => {
//     socket.on('mensajes', data => {
//       setMessages([...messages, data]);
//     })
//     return () => {socket.off()}
//   }, [messages]);

//   const submit = (e) => {
//     e.preventDefault();
//     socket.emit('mensaje', name, permission, message);
//     setMessage('');
//   } 

//   return (
//     <div>
//       <div>
//         <div>
//           {messages.map((mess, i) => 
//             <div key ={i}>
//               <p>{mess.name}</p> 
//               <p>{mess.message}</p>
              
//             </div>
//           )}
//         </div>
//         <form onSubmit={submit}>
//           <label>Escriba su mensaje</label>
//           <textarea value= {message} onChange={(e) => setMessage(e.target.value)}></textarea>
//           <button>Enviar</button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Chat

function ChatUser () {
  
  let cookie = new Cookies();
  const userInfo = cookie.get('user').user;
  let ENDPOINT = (process.env.REACT_APP_API || "http://localhost:3001");
  const [socket, setSocket] = useState(null);
  const msgRef = useRef(null);
  const [messageBody, setmessageBody] = useState('');
  const [messages, setMessages] = useState([{
    name: 'admin', body: 'Hola, puede iniciar su consulta'
  }]);

  useEffect(() => {
    if(msgRef.current) {
      msgRef.current.scrollBy({
        top: msgRef.current.clientHeight,
        left: 0,
        behavior: 'smooth'
      })
    }
    if(socket) {
      socket.emit('connected', {
        name: userInfo.name,
        isAdmin: userInfo.permission === 'admin' ? true : false,
      });

      socket.on('message', (data) => {
        setMessages([...messages, {body: data.body, name: data.name}]);
      })
    }
  },[messages, userInfo, socket]);

  const supportHandler = () => {
    const sk = socketServer
    setSocket(sk);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if(!messageBody.trim()){
      alert('Error, por favor escriba un mensaje.');
    } else {
      setMessages([...messages, {body: messageBody, name: userInfo.name + ' ' + userInfo.lastName}])
      setmessageBody('');
      setTimeout(() => {
        socket.emit('onMessage', {
          body: messageBody,
          name: userInfo.name + ' ' + userInfo.lastName,
          isAdmin : userInfo.permission === 'admin' ? true : false,
        });
      }, 1000);
    }
  };

  return (
    <div>
      <div>
        <div>
          <strong><h3>Soporte técnico</h3></strong>
        </div>
        <ul ref={msgRef}>
          <div>
            {messages.map((msg, i) =>(
              <li key={i}>
                <div style={{animationDelay: `0.8s`}}
                className={`chat-item ${msg.name !== 'admin' ? 'me' : 'admin'}`}>
                  <div>
                    <stong>{`${msg.name}: `}</stong>
                    <div>{msg.body}</div>
                  </div>
                </div>
              </li>
            ))}
          </div>
        </ul>
        <div>
          <form onSubmit={submitHandler} onClick={supportHandler}>
            <input
              value={messageBody}
              onChange= {(e) => setmessageBody(e.target.value)}
              type="text"
              placeholder="Escriba su mensaje"
            />
            <button type='submit'>
              <i>Enviar</i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatUser;