import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Nav from "./Navbar";
import '../styles/Sharedlayout.css'
import { motion } from "framer-motion"


const SharedLayout = () => {
    const [mobile, setMobile] = useState(false)
    useEffect(()=>{
        if (window.innerWidth < 700){
            setMobile(()=> true)
        } 
    })
    
    
    return (
        <>  
            {mobile && (<div className="mobile-page">
                <h6>
                    This site is not available on mobile.
                </h6>
            </div>)}
            {!mobile && (
                <>
                    <Nav />
                    <div> 
                        <Outlet />  
                    </div>
                </>
            )}
        </>
        
    )
};

export default SharedLayout;