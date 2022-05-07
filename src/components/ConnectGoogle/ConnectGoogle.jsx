import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Cookies from 'universal-cookie';

const clientId = "141090610633-2n16fmmu0hek8ioah1m1o6508blcmn4t.apps.googleusercontent.com";

function ConnectGoogle() {
    let cookie = new Cookies()
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
    // const [googleUser, setgoogleUser] = useState(null);
    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        cookie.set('googleUser', res.profileObj)
        // setgoogleUser(res.profileObj)

        
        setShowloginButton(false);
        setShowlogoutButton(true);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
        cookie.clear()
        // setgoogleUser()
    };

    return (
        <div>
            {/* {googleUser?.givenName} */}
            { showloginButton ?
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign In"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : null}

            { showlogoutButton ?
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Sign Out"
                    onLogoutSuccess={onSignoutSuccess}
                >
                </GoogleLogout> : null
            }
        </div>
    );
}
export default ConnectGoogle;