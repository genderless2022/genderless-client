// import React from "react";
// import { Link} from "react-router-dom";
// import './AdminDetail.css';
// //import { useState } from "react";



// export default function AdminDetail() {

// //let user = useState(state=> state?.userReducer.usuario);
// let user={
//     name:'Roxana',
//     lastName:'Canciani', 
//     email:'roxis@correo.com', 
//     picture:'', 
//     born:'12-11-1979', 
//     dni:'23444555', 
//     address:'baltazar Gallegos 614', 
//     province:'Cordoba', 
//     postal:'5008', 
//     phone:'3645738373'



    
// }
//     return (
//         <div className="container-admin-detail">

//             {user
//                 ? <div>
//                     <div className="profile-container">
//                         <img className="userImgOnprofile" alt='img user' src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL3-fxYXhHbPLtDz72SAnRopI8b22xxS-SHCNTp8VpPP8GuOD4Ix3kxB3OokobuqGctVE&usqp=CAU"}></img>
//                         <div>Nombre: {user?.name} {user?.lastName} </div>
//                         <div>Email: {user?.email} </div>
//                         <div>Fecha de Nac.: {user?.born} </div>
//                         <div>Dni: {user?.dni} </div>
//                         <div>Direccion: {user?.address} </div>
//                         <div>Provincia: {user?.province} </div>
//                         <div> Codigo Postal: {user?.postal} </div>
//                         <div>Telefono: {user?.phone} </div>

//                         <Link to="/editar">
//                             <button className="loginbtn">Editar mis Datos</button>
//                         </Link>

                        
                       
//                     </div>
//                 </div>
//                 : <div>No existe</div>
//             }
//         </div>);
// }

import React from "react";
import { Link} from "react-router-dom";
import './AdminDetail.css';
//import { useState } from "react";
import Cookies from "universal-cookie";



export default function AdminDetail() {

    let cookie = new Cookies();
    const user = cookie.get('user')
   

   


    return (
        <div className="container-admin-detail">

            {user
                ? <div>
                    <div className="profile-container-admin">
                        <img className="userImgOnprofile" alt='img user' src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL3-fxYXhHbPLtDz72SAnRopI8b22xxS-SHCNTp8VpPP8GuOD4Ix3kxB3OokobuqGctVE&usqp=CAU"}></img>
                        <div>Nombre: {user?.name} {user?.lastName} </div>
                        <div>Email: {user?.email} </div>
                        <div>Fecha de Nac.: {user?.born} </div>
                        <div>Dni: {user?.dni} </div>
                        <div>Direccion: {user?.address} </div>
                        <div>Provincia: {user?.province} </div>
                        <div> Codigo Postal: {user?.postal} </div>
                        <div>Telefono: {user?.phone} </div>

                        <Link to="/admin/editar">
                            <button className="loginbtn">Editar mis Datos</button>
                        </Link>
                        
                       
                    </div>
                </div>
                : <div>No existe</div>
            }
        </div>);
}