import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { createUser } from '../../redux/actions/userActions';

const clientId = "141090610633-2n16fmmu0hek8ioah1m1o6508blcmn4t.apps.googleusercontent.com";

function ConnectGoogle(props) {
    let nav = useNavigate()
    let cookie = new Cookies()
    let dispatch = useDispatch()
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
   

    const onLoginSuccess = (res) => {
        let user = res.profileObj
        console.log('Login Success:', user);
        cookie.set('googleUser', user)
        cookie.set('user', {
            
            name: user.givenName,
            lastName: user.familyName,
            email: user.email,
            picture: user.imageUrl        
        }
        )
        

        
        setShowloginButton(false);
        setShowlogoutButton(true);

        cookie.get('user') && props.redirect && nav('/home')
        dispatch(createUser(cookie.get('user').user))
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
        cookie.remove('user')
        cookie.remove('googleUser')
        !cookie.get('user') && props.redirectLogout && nav('/home')
        // setgoogleUser()
    };

    return (
        <div>
            {/* {googleUser?.givenName} */}
            { showloginButton && props.login ?
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Conectate con Google"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : null}

            { showlogoutButton && props.logout ?
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Cerrar Sesión"
                    onLogoutSuccess={onSignoutSuccess}
                >
                </GoogleLogout> : null
            }
        </div>
    );
}
export default ConnectGoogle;