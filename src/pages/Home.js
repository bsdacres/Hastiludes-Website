import React, { useState } from 'react';
import '../styles/Sharedlayout.css';
import mikla from '../styles/BG-2.png'
import { motion } from "framer-motion";
import { useAccount } from 'wagmi'


let mint = 'Please Connect Your Wallet';
let account;

export default function Home() { 
  const { address, isConnecting, isDisconnected, isConnected } = useAccount()

  if (isConnected){
    mint = 'Explore'
  } else if (isConnecting){
    mint= 'connecting...'
    account = null 
  } else {
    mint = 'Connect Wallet'
    account = null
  }
  
  return(
  <motion.div 
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.7 }}
  
  >
      <div className='Main'>
        <div className='front'> 
            <div className='card'>
              <img className='img' src={mikla} alt='picture of traveler' />
            </div>
            <div className='card-text'>
              <div className='innerCard'>  
                <h1>Hastiludes</h1>
                <hr />
                <h3>A Premiere Multi-Chain Fantasy</h3>
                <p>An extension of the <a href='https://covenaunt.com' target='_blank'>Covenaunt Mythos</a>, Hastiludes incorporates decentralized technology to usher in fantastical recreational experiences.</p>
                <p className='footnote'> A Covenaunt Project</p>
                <button className='mint-btn'>{mint}</button>
                <div className='address-btn'>{account}</div>
              </div>  
            </div>
          </div> 
        </div>
    </motion.div>   
    )
    
    ;
};