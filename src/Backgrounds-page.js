import React from 'react';
import ReactDOM from 'react-dom';
import './Backgrounds.css';
import Backgrounds from './Backgrounds.js';
import reportWebVitals from './reportWebVitals';

//Do the same for world background!
ReactDOM.render(
    <React.StrictMode>
        <div class="outerContainer">
            <Backgrounds />
        </div>
    </React.StrictMode>,
    document.getElementById('video-call-background')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
