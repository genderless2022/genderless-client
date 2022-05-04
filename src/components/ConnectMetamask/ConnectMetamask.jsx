import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import './ConnectMetamask.css';

function ConnectMetamask() {
    let [state, setState] = useState({
        walletAddress: localStorage.getItem('wallet'),
        userBalance: localStorage.getItem('balance'),
        tx: null,
        error: null
    })

    
    let walletAddress = state.walletAddress
    let userBalance = state.userBalance
    let tx = state.tx
    let error = state.error
    async function requestAccount(){
        if(window.ethereum){
            console.log(window.ethereum)
            
            try{
                await window.ethereum.request({
                    method: 'eth_requestAccounts'
                }).then( async accounts => {
                    // setState({...state, walletAddress: accounts[0]})
                    
                    localStorage.setItem( 'wallet', accounts[0] )
                    
                    await window.ethereum.request({
                        method: 'eth_getBalance',
                        params: [accounts[0], 'latest']
                    }).then( balance => {
                        // setState({...state, userBalance:  ethers.utils.formatEther(balance) })
    
                        localStorage.setItem( 'balance', String(ethers.utils.formatEther(balance)))
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
    
    async function transaction(){
        try{
            !walletAddress && requestAccount()
            if (window.ethereum){
                // requestAccount()
    
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner()
                const tx = await signer.sendTransaction({
                    to: '0x4f966a88c0b741bb93287547df012c8101878832',
                    value: ethers.utils.parseEther('0.002')
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

    function logoutMetamask(){
        localStorage.clear()
        window.location.reload()
    }

  return (
    <>
        
        <div>METAMASK</div>
        {  <button className='metaLoginButton' onClick={ () => requestAccount()}><img className='metaLogo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png'></img></button>}
        <div>
            {walletAddress ? 'Your Wallet Address: ' + walletAddress : null }
        </div>
        <div>
            {userBalance ? 'Your Balance: ' + userBalance : null }
        </div>
        <button className='payMetaButton' onClick={ () => transaction()}>Pay: 0.02</button>
        {/* <div> 
            { error && !tx && error}
        </div> */}
        <div>{ tx && 'El hash de su transaccion es: ' + tx?.hash}</div>
        { walletAddress && <button className='logoutMetaButton' onClick={ () => logoutMetamask() }>Logout</button> }
        <div> { error && error } </div>

        { localStorage.getItem('lastTx') && <div>Your Last Transaction made hash: {' ' + localStorage.getItem('lastTx')}</div>}
    </>
  );
}

export default ConnectMetamask