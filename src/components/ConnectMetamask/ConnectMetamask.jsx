import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import './ConnectMetamask.css';
// props = { type, eth }
function ConnectMetamask(props) {

    // Estado donde guardamos los datos de metamask del usuario 
    let [state, setState] = useState({
        walletAddress: localStorage.getItem('wallet'),
        userBalance: localStorage.getItem('balance'),
        tx: null,
        error: null,
        eth: props.eth || 0.005,
        ishoverLogout: false
    })

    // Creamos los punteros al estado para facilitar lectura
    let walletAddress = state.walletAddress
    let userBalance = state.userBalance
    let tx = state.tx
    let error = state.error
    let eth = state.eth
    let ishoverLogout = state.ishoverLogout
    // Funcion que abre Pop Up y obtiene los datos de la extensión de Metamask
    async function requestAccount(){

        // Se revisa si existe la extension
        if(window.ethereum){
            console.log(window.ethereum)
            
            try{
                // Se realiza una petición con la extensión
                await window.ethereum.request({
                    // Abre el Pop Up de login 
                    method: 'eth_requestAccounts'

                    // Obtiene las cuentas 
                }).then( async accounts => {
                    
                    // Se guarda en el localStorage la dirección de la primera wallet encontrada
                    localStorage.setItem( 'wallet', accounts[0] )
                    
                    // Posteriormente se realiza una petición nueva para obtener el balance de cuenta
                    await window.ethereum.request({
                        // No abre popUp y se le pasa la cuenta encontrada pidiendo el último estado de transacción ('latest')
                        method: 'eth_getBalance',
                        params: [accounts[0], 'latest']

                        // Obtiene balance en formato Ether
                    }).then( balance => {
                        
                        // Se guarda en el localStorage el balance, dandole formato para que aparezca como cantidad
                        localStorage.setItem( 'balance', String(ethers.utils.formatEther(balance)))

                        // Se actualiza la página para ver los cambios
                        window.location.reload()
                    })
                } )
                
                
            }
            catch (error) {
                console.log('Error connecting...' + error);
                setState({...state, error: error})
            }
        }
        else{
            console.log('Install Metamask')
            setState({...state, error: 'Install Metamask'})
        }
        
    }
    
    // Se crea una transaccion a partir de los datos de Metamask
    async function transaction(eth){
        try{
            !walletAddress && requestAccount()
            if (window.ethereum){
                // requestAccount()
    
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner()
                const tx = await signer.sendTransaction({
                    to: '0x4f966a88c0b741bb93287547df012c8101878832',
                    value: ethers.utils.parseEther(String(eth))
                })
                console.log('Transaction: ' + tx)
                setState({...state, tx: tx})
                localStorage.setItem('lastTx', tx.hash)
            }

        }
        catch ( error ) {
            console.log(error);
            setState({...state, error: error.message})
        }

    }

    // Se borran los datos en el localStorage
    function logoutMetamask(){
        localStorage.clear()
        window.location.reload()
    }

  return (
    <>
        
      
        {/* Login Button */}
        <div>
            { props.type === 'login' && <button className='metaLoginButton' onClick={ () => requestAccount()}><img className='metaLogo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png'></img></button>}
        </div>

        {/* Wallet Addres */}
        <div>
            { props.type === 'wallet' && walletAddress ? 'Your Wallet Address: ' + walletAddress : null }
        </div>

        {/* User Balance */}
        <div className='balance'>
            { props.type === 'balance' && userBalance ?   Number.parseFloat(userBalance).toFixed(5) + ' ETH' : null }
        </div>

        {/* Make a transaction */}
            { props.type === 'transaction' && <button className='payMetaButton' onClick={ () => transaction(eth)}>{"Pay: " + eth }</button>}

        {/* Hash de Transaccion */}
        <div>
            { tx && 'El hash de su transaccion es: ' + tx?.hash}
        </div>

        {/* Logout Button */}
        <div>
            { props.type === 'logout' && walletAddress && 
            <button className='logoutMetaButton' onMouseEnter={ () => setState({
                ...state, 
                ishoverLogout: !ishoverLogout
            })} onMouseLeave = { () => setState({
                ...state,
                ishoverLogout: !ishoverLogout
            })} onClick={ () => logoutMetamask() }>
                
                {
                    ishoverLogout ? 
                    <span>
                        Logout MetaMask
                    </span>
                    :
                    <span>
                        L
                    </span>
                }

            </button> }
        </div>

        {/* Error Messages */}
        <div> 
            { error && error } 
        </div>

        {/* Last Stored Transaction */}
        { localStorage.getItem('lastTx') && <div>Your Last Transaction made hash: {' ' + localStorage.getItem('lastTx')}</div>}
    </>
  );
}

export default ConnectMetamask