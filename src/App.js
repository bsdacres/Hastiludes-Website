import './Sharedlayout.css'
import React from "react";
import Home from './Home'
import SharedLayout from "./SharedLayout";
import AnimatedRoute from './AnimatedRoute';
import card from './card-1.png'
import Codex from './Codex';
import Play from './play';
import News from './News';

import { BrowserRouter ,Routes,Route, useLocation } from "react-router-dom";



export default function App() {
    return(
        <Routes>
            <Route path = '/' element = {<SharedLayout />} >
                <Route path='/' element = {<Home />} />
                <Route path = 'News' element = {<News 
                
               p = 'Nothing to Report yet...' />} />
                <Route path = 'play' element = {<Play />} />
                <Route path = 'Codex' element = {<Codex />} />
            </Route>   
        </Routes>   
    );
}