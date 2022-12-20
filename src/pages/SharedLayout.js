import React from "react";
import { Link, Outlet } from "react-router-dom";
import Nav from "./Navbar";
import '../styles/Sharedlayout.css'
import { motion } from "framer-motion"


const SharedLayout = () => {
    return (
        <>
            <Nav />
            <div> 
                <Outlet />  
            </div>
        </>
        
    )
};

export default SharedLayout;