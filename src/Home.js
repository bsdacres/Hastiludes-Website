import React from 'react';
import './Sharedlayout.css';
import mikla from './BG-2.png'
import { motion } from "framer-motion";
export default function Home() { 
  return(
  <motion.div 
  initial={{width: 0}}
  animate ={{width: "100%"}}
  exit ={{x: window.innerWidth, transition: {duration: 3}}}

  className="Main">    
    <div className='front'> 
        <div className='card'>
          <img className='img' src={mikla} alt='' />
        </div>
        <div className='card-text'>
          <div className='innerCard'>  
            <h1>Hastiludes</h1>
            <hr />
            <h3>A Premiere Multi-Chain Fantasy</h3>
            <p>We're a brand seeking to create a sustainable IP on web3 via clothing, gaming, and traditional storytelling.</p>
            <p className='footnote'> A Covenaunt Project</p>
            <button className='button'>Mint Now</button>
          </div>  
        </div>
      </div>    
    </motion.div>   
    )
    
    ;
};