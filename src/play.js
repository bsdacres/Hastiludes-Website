import React from "react";
import { motion } from "framer-motion";
import GIF from "./Covenaunt-small.gif"


import './about.css'

export default function Play() {
    return(
        <div className='play'>
            <div className="background-hands">
                <div className="play-text">
                    <br />
                    <h1>We're Not Yet Finished</h1>
                    <p>We're still working on bringing you a fun and immersive experience within the world of Hastiludes. Check back soon for infomation on how to be whitelisted for our beta. </p>
                    <br />
                    <br />
                    <img style={{height:300}} src={GIF} />
                </div>
            </div>
        </div>
    )
}