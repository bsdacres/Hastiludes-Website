import React, { useState } from 'react';
import '../styles/Sharedlayout.css';
import mikla from '../styles/BG-2.png'
import { motion } from "framer-motion";
import { useAccount } from 'wagmi'
import { Link } from 'react-router-dom';
import { Color } from 'three';


export default function Home() { 
  const { address, isConnecting, isDisconnected, isConnected } = useAccount()
  
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
                <button className='mint-btn'><Link style={{color: 'black', textDecoration: 'none'}} to='/codex'>Explore</Link></button>
              </div>  
            </div>
          </div> 
        </div>
    </motion.div>   
    )
    
    ;
};