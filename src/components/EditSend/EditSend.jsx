import React from 'react'
import {useState }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {updateUser}  from '../../redux/actions/userActions';
import './EditSend.css';
import Cookies from "universal-cookie";



function validate(input){
    let errors = {};
    console.log(errors)
    
    if(!/[A-Za-z0-9]+/g.test(input.address)||input.address?.length<3 || input.address?.length>25){
        errors.address ="*Campo requerido";
    }
    if(!/^[a-z A-Z]+$/.test(input.province)||input.province?.length<3 || input.province?.length>20){
        errors.province ="*Campo requerido";
    }
    if(!/^[0-9]{4}$/.test(input.postal)){
        errors.postal = "*Campo requerido";
    }
    if(!input.phone){
        errors.phone = "*Campo requerido";
    }
    
    return errors;

}


export default function EditSend  () {
    let cookie = new Cookies();
    const userEdit = cookie.get('user')

    const dispatch = useDispatch();

    

   
   const nav = useNavigate();

   //const userEdit = useSelector(state => state.userReducer.status.user);
  

   const[errors, setErrors] = useState({});



    
    const[input, setInput] = useState({
        email: userEdit?.email,
        address: userEdit?.address,
        province: userEdit?.province,
        postal: userEdit?.postal,
        phone: userEdit?.phone,
        
    })



    
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
                if(!input.email ||!input.address|| !input.province  || !input.postal|| !input.phone  ){
                alert("no completo todo el formulario!")}
                else{
                dispatch(updateUser(input))
                alert('Datos actualizados')
                setInput({
                   
                    email: '',
                    phone: '',
                    address: '',
                    province: '',
                    postal: '',
                })
             nav('/shoppingcart')
            }
        }

            
    return (
        <div className="container-register-form">
            <form onSubmit={onSubmit} >
                <div className="container-user-edit">
                    <div className="form-container-edit">
                        <div className="title">Modificar mis datos</div>
                        <p className="register-subtitle">(* campos requeridos)</p>
                        <div className="form-group-one">
                            
                                
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
                                
                                <div className="labelAndInput">
                                <label className="input-label">*Dirección: </label>
                                <input onChange={(e)=>handlerOnChange(e)}
                                    className="input-register"
                                    type="text"
                                    name="address"
                                    value={input.address}
                                    placeholder= {userEdit?.address} 
                                />
                                {errors.address && <p className="form-register-errors">{errors.address}</p>}
                                </div>
                                <div className="labelAndInput">
                                <label className="input-label">*Provincia: </label>
                                <input onChange={(e)=>handlerOnChange(e)}
                                    className="input-register"
                                    type="text"
                                    name="province"
                                    value={input.province}
                                    placeholder= {userEdit?.provinceuserEdit} 
                                />
                                {errors.province && <p className="form-register-errors">{errors.province}</p>}
                                </div>
                                <div className="labelAndInput">
                                <label className="input-label">*Código postal: </label>
                                <input onChange={(e)=>handlerOnChange(e)}
                                    className="input-register"
                                    type="number"
                                    name="postal"
                                    value={input.postal}
                                    placeholder= {userEdit?.postal} 
                                />
                                {errors.postal && <p className="form-register-errors">{errors.postal}</p>}
                                </div>
                                <div className="labelAndInput">
                                <label className="input-label">*Celular: </label>
                                <input onChange={(e)=>handlerOnChange(e)}
                                    className="input-register"
                                    type="number"
                                    name="phone"
                                    value={input.phone}
                                    placeholder= {userEdit?.phone} 
                                />
                                {errors.phone && <p className="form-register-errors">{errors.phone}</p>}
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

        </div>
    );
};

