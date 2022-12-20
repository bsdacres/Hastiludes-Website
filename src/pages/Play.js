import React from "react";
import { motion } from "framer-motion";


import '../styles/about.css'

export default function Play() {
    return(

        <motion.div
        initial={{height: 0}}
        animate ={{height: "100%"}}
        exit ={{y: window.innerWidth, transition: {duration: 3}}}
        >
            <div className='play'>
                <div className="background-hands">
                    <div className="play-text">
                        <br />
                        <h1>OOPS...</h1>
                        <p>Looks like your wallet if not connected... </p>
                        <p>Please connect your wallet using the button in the top right corner</p>
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}