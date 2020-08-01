import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

var a = document.createElement("div");
a.id = "root";
a.style.width = "100%";
a.style.height = "100%";
a.style.position = "absolute"
a.style.top = "0px"
a.style.left = "0px"
a.style.zIndex = 9999999;
// document.body.appendChild(a);
document.body.insertBefore(a, document.body.firstChild);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

console.log("HELLOOO")

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
