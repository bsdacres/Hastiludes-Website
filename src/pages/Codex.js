import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import '../styles/codex.css'
import { ethers } from "ethers";
import image from '../styles/card-2.png'
import { lore } from "./lore";
import { MintButton } from "./components/MintButton";




export default function Codex(props) {

    const info ="Behold Mikla, the Wing Ridden, a central protagonist from the world of covenaunt"

    
    const [isTrue, SetisTrue] = useState(false)
    function handleClick() {
        SetisTrue(prevState => !prevState)
    }
    return(
            <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .7 }}
            className="codex">
                <div className="main-codex" onClick={handleClick}>
                  <div className="nft" style={{backgroundImage: `url(https://cdn.discordapp.com/attachments/998097105916809317/1053321111561064528/1.jpg)`}}></div>
                  <div className="metadata">
                    <h1>Voe's Cowl</h1>
                    <hr></hr>
                    <div className="attributes">
                      <div className="attr-box">VITALITY: ??</div>
                      <div className="attr-box">SAGACITY: ??</div>
                      <div className="attr-box">PIETY: ??</div>
                      <div className="attr-box">CELERITY: ??</div>
                    </div>
                    <p>
                      {lore}
                      <br></br>
                      <br></br>
                        <i>
                          A young knightness errant, Voe, wanders in search of renown befitting her familial legacy, though what she finds is a realm ridden with war and bound in endless struggle as Mikla, the Wing Ridden King launches a final crusade against the Fey Emperor, Ourenris XI.
                        </i>
                      <br></br>
                      <br></br>
                      This item may be redeemed for the physical equilavent in the near future. If you initially purchased the physical item before the mint you qualify for a discounted mint cost. Please Join our Discord Server to stay up to date on all news. 
                    </p>
                   <MintButton /> 
                  </div>
                </div>
            </motion.div>
    )
} 