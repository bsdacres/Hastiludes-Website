import React from "react";
import { Link, Outlet } from "react-router-dom";
import Nav from "./navbar";
import './Sharedlayout.css'


const SharedLayout = () => {
    return (
        <>
            <Nav />
            <div className="Global">
                <Outlet />  
            </div>
        </>
        
    )
};

export default SharedLayout;