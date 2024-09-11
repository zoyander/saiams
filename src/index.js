import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Subtitles from './Subtitles.js';
import Backgrounds from './Backgrounds.js';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <div id="newsfeed">
        <div class="outerContainer">
            <div id="story" class="container">
               <App />
            </div>
        </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root') //This is what's making App appear in the newsfeed div on the right. You can put other components in other divs by using other ids.
);

//Make a file called something like "webinar" that is similar to "app",
//import it and render like App is above, rename it to something more appropriate

//Do the same for subtitles!
ReactDOM.render(
    <React.StrictMode>
        <div class="outerContainer">
            <Subtitles />
        </div>
    </React.StrictMode>,
    document.getElementById('subspace')
);

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
