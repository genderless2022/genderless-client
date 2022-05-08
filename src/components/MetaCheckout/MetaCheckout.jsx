import React, { useState } from "react";
import Cookies from "universal-cookie";
import ConnectMetamask from "../ConnectMetamask/ConnectMetamask";
import EthPrice from "../EthPrice/EthPrice";
import './MetaCheckout.css';

let metaCover = 'https://www.bitdegree.org/crypto/storage/media/images/metamask-wallet-review-logo-big.o.png'
let eth_test = 0.002
let ethLogo = 'http://assets.stickpng.com/images/5a7593fc64538c292dec1bbf.png'



function MetaCheckout() {
    let cookie = new Cookies()
    let [state, setState] = useState({
        eth: !cookie.get('shoppingTotal') ? eth_test : cookie.get('shoppingTotal'),
        currencyCode: 'USD'
    })
    let eth = state.eth
    let currencyCode = state.currencyCode


    return (
      <>

        <div>
            <div className="metaLogoCheckoutContainer">
                <img className="metaLogoCheckout" src={metaCover}></img>
            </div>
            <div className="ethereumLogoCheckoutContainer">
                <img className="ethereumLogoCheckout" src={ethLogo}></img>
            </div>

            {/* Si hay wallet muestra el botón de pago */}
            { localStorage.getItem('wallet') ?
                <div>
                    <EthPrice currencyCode = {currencyCode}></EthPrice>
                    <ConnectMetamask type = 'transaction' eth = {eth}></ConnectMetamask>
                </div>
                :
                // Si no hay wallet te muestra el botón de login
                <div>
                    <ConnectMetamask type = 'login' loginTextButton = 'Conectá tu Wallet'></ConnectMetamask>
                </div>
            }
            
        </div>

        
      </>
    );
}

export default MetaCheckout;
