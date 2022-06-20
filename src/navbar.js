import React from 'react'
import './Sharedlayout.css';
import { Link } from 'react-router-dom';

export default function Nav(props) {
    return(
<div>
                <div className="navbar">
                    <Link to='/'>Home</Link>
                    <Link to='/news'>News</Link>
                    <Link to='/codex'>Codex</Link>
                    <Link to='/play'>Play Now</Link>
                    <div className='metamask'>
                        <a><p>{props.a}</p><img className='metamask-img' src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/32px-MetaMask_Fox.svg.png' alt='connect your metamask' /></a>
                    </div>
                </div>
</div>                
    );
};