import React, {useState, useEffect, useRef} from 'react'
import { Col, Row } from 'react-bootstrap';
import SocketIOClient  from 'socket.io-client';
import MessageBox from './MessageBox';
import Cookies from 'universal-cookie';

let allUsers = [];
let allMessages = [];
let allSelectedUsers = {};

let ENDPOINT = (process.env.REACT_APP_API || "http://localhost:3001");

function ChatSupp(props) {
    const [selectedUser, setSelectedUser] = useState({});
    const [socket, setSocket] = useState(null);
    const msgRef = useRef(null);
    const [messageBody, setmessageBody] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    let cookie = new Cookies();
    const userInfo = cookie.get('user').user;
    
    console.log(userInfo, '---')

    useEffect(() => {
        if(msgRef.current) {
            msgRef.current.scrollBy({
                top: msgRef.current.clientHeight,
                left: 0,
                behavior: 'smooth'
            });
        }
        if(!socket) {
            const sk = SocketIOClient("http://localhost:3001");
            setSocket(sk);
            sk.emit('connected', {
                name: userInfo.permission === 'admin' ? 'admin' : userInfo.name + ' ' + userInfo.lastName,
                isAdmin: userInfo.permission === 'admin' ? true : false,
            });

            sk.on('message', (data) => {
                if(allSelectedUsers.name === data.name) {
                    allMessages = [...allMessages, data];
                } else {
                    const existUser = allUsers.find(user => user.name === data.name);
                    if(existUser) {
                        allUsers = allUsers.map((user) => 
                            user.name === existUser.name ? {...user, unread: true} : user
                        );
                        setUsers(allUsers);
                    }
                }
                setMessages(allMessages);
            });

            sk.on('updateUser', (updatedUser) => {
                const existUser = allUsers.find((user) => user.name === updatedUser.name);
                if(existUser) {
                    allUsers = allUsers.map((user) => 
                        user.name === existUser.name ? updatedUser : user
                    );
                    setUsers(allUsers);
                } else {
                    allUsers = [...allUsers, updatedUser];
                    setUsers(allUsers);
                }
            });

            sk.on('listUsers', (updatedUsers) => {
                allUsers = updatedUsers;
                setUsers(allUsers);
            });

            sk.on('selectUser', (user) => {
                allMessages = user.messages;
                setMessages(allMessages);
            });
        }
    }, [messages, socket, users]);

    const selectUser = (user) => {
        allSelectedUsers = user;
        setSelectedUser(user);
        const existUser = allUsers.find((x) => x.name === user.name);
        if(existUser) {
            allUsers = allUsers.map((x) => 
            x.name === existUser.name ? {...x, unread: false} : x
            );
            setUsers(allUsers);
        }
        socket.emit('onUserSelected', user);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if(messageBody.trim()) {
            alert ('Error, por favor escriba un mensaje.');
        } else {
            allMessages = [
                ...allMessages,
                {body: messageBody, name : userInfo.permission === 'admin' ? 'admin' : userInfo.name + ' ' + userInfo.lastName}
            ];
            setMessages(allMessages);
            setmessageBody('');
            setTimeout(() => {
                socket.emit('onMessage', {
                    body: messageBody,
                    name: userInfo.permission === 'admin' ? 'admin' : userInfo.name + ' ' + userInfo.lastName,
                    isAdmin: userInfo.permission === 'admin' ? true : false,
                })
            }, 1000);
        }
    };

  return (
    <div>
        <Row>
            <Col xs='12' md='12' xl='3'>
                {users.filter((elem) => elem.name !== userInfo.name).length === 0 ? (
                    <MessageBox>No hay usuarios Online</MessageBox>
                ):(
                    <div>
                        <h3>Seleccione un usuario</h3>
                    </div>
                )}
                <ul>
                    {users
                    .filter((elem) => elem.name !== userInfo.name)
                    .map((here) => (
                        <li style= {{animationDelay: `0.2s`}}
                            key={here.name}
                            className = {here.name === selectedUser.name ? `chat-item active` : 'chatlist-item'}
                        >
                            <button
                                type="button"
                                onClick={() => selectUser(here)}
                            >
                                {here.name}
                            </button>
                            <div>
                                <span
                                    className = {here.unread ? 'unread' : here.online ? 'online' : 'offline'}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </Col>
            <Col xs='12' md='12' xl='9'>
                {!selectedUser.name ? (
                    <MessageBox>Seleccione un usuario</MessageBox>
                ):(
                    <div>
                        <div>
                            <strong>
                                <h3>Chat con {selectedUser.name}</h3>
                            </strong>
                        </div>
                        <ul ref= {msgRef}>
                            {messages.length === 0 && <li>No hay mensajes</li>}
                            <div>
                                {messages.map((msg, i) => (
                                    <li key={i}>
                                        <div styles = {{animationDelay: `0.8s`}}
                                            className = {`${msg.name === 'admin' ? 'yo' : 'otro'}`}>
                                                <div>
                                                    <strong>{`${msg.name}: `}</strong>
                                                    <div>{msg.body}</div>
                                                </div>
                                        </div>
                                    </li>
                                ))}
                            </div>
                        </ul>
                        <div>
                            <form onSubmit={submitHandler}>
                                <input
                                    value = 'messageBody'
                                    onChange={(e) => setmessageBody(e.target.value)}
                                    type="text"
                                    placeholder="Escriba su mensaje"
                                />
                                <button type="submit">
                                    <i>Enviar</i>
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </Col>
        </Row>
    </div>
  );
}

export default ChatSupp;