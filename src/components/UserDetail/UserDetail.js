import React, { useState } from "react";
import { Link} from "react-router-dom";
import './UserDetail.css';
import Cookies from "universal-cookie";
import ConnectGoogle from "../ConnectGoogle/ConnectGoogle";
import ConnectMetamask from "../ConnectMetamask/ConnectMetamask";


export default function UserDetail() {


    let cookie = new Cookies();
    const user = cookie.get('user')
   console.log('user',user);
   let [state, setState] = useState({
    wallet: localStorage.getItem('wallet') || null,
  })
  let wallet = state.wallet

   


    return (
        <div className="container-user-detail">

            {user
                ? <div>
                    <div className="profile-container">
                        <img className="userImgOnprofile" alt='img user' src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL3-fxYXhHbPLtDz72SAnRopI8b22xxS-SHCNTp8VpPP8GuOD4Ix3kxB3OokobuqGctVE&usqp=CAU"}></img>
                        { user.lastName && <div>Nombre: {user?.name} {user?.lastName} </div>}
                        { user.email && <div>Email: {user?.email} </div>}
                        { user.born && <div>Fecha de Nac.: {user?.born} </div>}
                        { user.dni && <div>Dni: {user?.dni} </div>}
                        { user.address && <div>Direccion: {user?.address} </div>}
                        { user.province && <div>Provincia: {user?.province} </div>}
                        { user.postal && <div> Codigo Postal: {user?.postal} </div>}
                        { user.phone && <div>Telefono: {user?.phone} </div>}

                        <Link to="/editar">
                            <button className="loginbtn">Editar mis Datos</button>
                        </Link>


                        { !wallet  &&
                                <div className='login-meta-container'>
                                    <ConnectMetamask type= {'login'} ></ConnectMetamask>
                                </div>
                        }

                        {/* { wallet  &&
                                <div className='login-meta-container'>
                                    <ConnectMetamask type= {'widget_menu'} ></ConnectMetamask>
                                </div>}
                            
                              
                                { !wallet  &&
                                <div className='login-meta-container'>
                                    <ConnectMetamask type= {'login'} ></ConnectMetamask>
                                </div>
                        }   */}
                                          

                    </div>
                </div>
                : <div>No existe</div>
            }
        </div>);
}