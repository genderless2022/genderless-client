import React from "react";
import { Link} from "react-router-dom";
import './UserDetail.css';
//import { useState } from "react";
import Cookies from "universal-cookie";



export default function UserDetail() {

    let cookie = new Cookies();
    const user = cookie.get('user')
   

   


    return (
        <div className="container-user-detail">

            {user
                ? <div>
                    <div className="profile-container">
                        <img className="userImgOnprofile" alt='img user' src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL3-fxYXhHbPLtDz72SAnRopI8b22xxS-SHCNTp8VpPP8GuOD4Ix3kxB3OokobuqGctVE&usqp=CAU"}></img>
                        <div>Nombre: {user?.name} {user?.lastName} </div>
                        <div>Email: {user?.email} </div>
                        <div>Fecha de Nac.: {user?.born} </div>
                        <div>Dni: {user?.dni} </div>
                        <div>Direccion: {user?.address} </div>
                        <div>Provincia: {user?.province} </div>
                        <div> Codigo Postal: {user?.postal} </div>
                        <div>Telefono: {user?.phone} </div>

                        <Link to="/editar">
                            <button className="loginbtn">Editar mis Datos</button>
                        </Link>
                        
                       
                    </div>
                </div>
                : <div>No existe</div>
            }
        </div>);
}