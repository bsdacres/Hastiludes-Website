import { Routes, Route, useLocation } from "react-router-dom";
import '../styles/Sharedlayout.css';
import React from "react";
import Home from './Home';
import SharedLayout from "./SharedLayout";
import News from "./News";
import Play from "./Play";
import Codex from './Codex';
import { AnimatePresence } from "framer-motion";

export default function AnimatedRoute(){
    const location = useLocation();
    return(
       <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path = '/' element = {<SharedLayout />} >
                <Route path='/' element = {<Home />} />
                <Route path = 'News' element = {<News />} />
                <Route path = 'play' element = {<Play />} />
                <Route path = 'Codex' element = {<Codex />} />
            </Route>  
        </Routes>
    </AnimatePresence>   
    );
}