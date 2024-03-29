import React from 'react'
import {useState, useEffect }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {updatePassword}  from '../../redux/actions/userActions';
import './index.css';
import Cookies from "universal-cookie";
import { TiArrowBack } from 'react-icons/ti';
import {Link} from 'react-router-dom'
import { getUser } from "../../redux/actions/userActions";
import {Modal, Button} from 'react-bootstrap';


function validate(input){
    let errors = {};
    
    if(!/^(?=.\d)(?=.[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(input.password)){
        errors.password = "*Campo requerido";
     }
   
    return errors;

}

//! Ruta ya protegida que se le pasa el token

export default function EditPassword  () {
    let cookie = new Cookies();
    const userEdit = useSelector(state => state.userReducer.usuario)
    const user = cookie.get('user')
    const tokenUser = cookie.get('user')?.tokenSession

    const nav = useNavigate();
    const dispatch = useDispatch();
    const[errors, setErrors] = useState({});
    const[input, setInput] = useState({
         password: '',
         
         email: userEdit.user?.email,
        
         
     })
     const [modal, setModal] = useState("")
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const modalDelete = (value) => {
        setModal(value)
        handleShow()
    }

    const handlemodal=(data)=>{
        nav('/user/profile')
       
    }

  useEffect(() => {
        dispatch(getUser({ email: user.email, password: user.password, token:tokenUser }))
        // dispatch(getUser({ email: user.email, token: tokenUser}))
    },[dispatch, user.email, user.password, tokenUser])
    
    function handlerOnChange (e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }) )
    }

    function onSubmit(e){
        e.preventDefault();
        if(!input.password ){
        modalDelete("no completo todo el formulario!")}
        else{
        dispatch(updatePassword({...input, token: tokenUser}))
       
        modalDelete('Datos actualizados')
        setInput({
            password:'',
            email:''
            
        })
       
    }
    }

            
    return (
        <div className="container-register-form">
          <form onSubmit={onSubmit} >
            <div className="container-pass-edit">
               <div className="form-container-pass">
                <div>
                 <Link to='/user/profile' style={{ color: 'white', fontSize: '20px' }}>
                  <TiArrowBack/>
                 </Link>
                </div>
                     <div className="title">Modificar mi Contraseña</div>
                        <p className="register-subtitle">(* campos requeridos)</p>
                        <div className="form-group-one">
                            <div className="labelAndInput">
                                <label className="input-label">*Password: </label>
                                <input onChange={(e)=>handlerOnChange(e)}
                                    className="input-register"
                                    type="text"
                                    name="password"
                                    value={input.password}
                                    // placeholder= {userEdit?.password} 
                                    /> 
                                      {/* {errors.password && <p className="form-register-errors">{errors.password}</p>} */}
                                </div>
                                
                                <div className="labelAndInput">
                                <label className="input-label">*Email: </label>
                                <input
                                    readOnly
                                    onChange={(e)=>handlerOnChange(e)}
                                    className="input-register"
                                    type="text"
                                    name="email"
                                    value={input.email}
                                    placeholder= {userEdit?.email}
                                   />
                                {errors.email && <p className="form-register-errors">{errors.email}</p>}
                                </div>
                                
                                </div>
                                <div className="form-submit">
                                <input
                                type="submit"
                                value="EDITAR"
                                />
                             </div>
                         </div>
                   </div>
            </form>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
            <Modal.Header closeButton>
                <Modal.Title>Modificacion exitosa!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {modal}
            </Modal.Body>
            <Modal.Footer>
                 {/* <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>  */}
                <Button variant="primary" onClick={handlemodal} >Continuar</Button>
            </Modal.Footer>
            </Modal>

        </div>
    );
};