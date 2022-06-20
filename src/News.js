import React, { useEffect, useState } from "react";
import '.styles/about.css'
import axios from 'axios'
import { motion } from "framer-motion";

export default function News(props) {
    
    const [post, setPost] = useState();


    useEffect(() => {
        const fetchInstagram = async () => {
            try {
                const response = await axios.get('https://api.twitter.com/2/users/1525142295762374656/');
                console.log(response)
            } catch (err) {
                if(err.response) {
                    console.log(err.response.data);
                    console.log(err.response.data);
                    console.log(err.response.data);
                } else {
                    console(`Error: ${err.message}`)
                }

            }
        }
    })

    return(
        <motion.div 
        initial={{height: 0}}
        animate ={{height: "100%"}}
        exit ={{y: window.innerWidth, transition: {duration: 3}}}

        className="main">
            <div className="news-columns">
                <div>
                    <img src={props.img} />
                </div>
                <div>
                    <p>{props.p}</p>
                </div>
            </div>
        </motion.div>
    )
}