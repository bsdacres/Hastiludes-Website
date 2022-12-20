import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App'; 
import { BrowserRouter } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className='index'>
            <BrowserRouter>
                <App />
            </BrowserRouter>
    </div>      
);
