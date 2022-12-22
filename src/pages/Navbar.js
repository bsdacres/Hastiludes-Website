import React from 'react'
import '../styles/Sharedlayout.css';
import { Link } from 'react-router-dom';
import { Web3Button } from '@web3modal/react'
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from 'wagmi'





let connectBtn ='Connect Wallet'

export default function Nav(props) {
    const { isOpen, open, close } = useWeb3Modal();
    const { address, isConnecting, isDisconnected, isConnected } = useAccount();



    if (isConnected){connectBtn = {address}} 


    return(
            <div>
                <div className="navbar">
                    <Link to='/'>Home</Link>
                    <Link to='/news'>News</Link>
                    <Link to='/codex'>Codex</Link>
                    <Link to='/play'>Armory</Link>
                    <div className = 'wallet-btn' >
                        <Web3Button />
                    </div>
                </div>
            </div>                
    );
};