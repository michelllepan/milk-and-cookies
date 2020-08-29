import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.png';
import App from './App';
import Cookie from './Cookie';
import * as serviceWorker from './serviceWorker';
import {replaceOnScreen} from './extract.js';

// var a = document.createElement("div");
// a.id = "overlay";
// a.style.width = "100%";
// a.style.height = "100%";
// a.style.position = "absolute"
// a.style.top = "0px"
// a.style.left = "0px"
// a.style.zIndex = 9999999;
// document.body.insertBefore(a, document.body.firstChild);

// function test() {
//   console.log("hello")
// }

// const cookie = <div><img src="./logo.png" onClick={test}/></div>
// window.onload = function() {
//   document.body.insertAdjacentHTML("afterbegin", "<div><img src='./logo.png' onClick='console.log()'/></div>");
// }

function mountPopup() {
  var a = document.createElement("div");
  a.id = "overlay";
  a.style.width = "100%";
  a.style.height = "100%";
  a.style.position = "absolute"
  a.style.top = "0px"
  a.style.left = "0px"
  a.style.zIndex = 9999999;
  document.body.insertBefore(a, document.body.firstChild);

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("overlay")
  );
}

var b = document.createElement("div");
b.id = "cookie";
b.style.position = "fixed"
b.style.bottom = "20px"
b.style.right = "20px"
b.style.zIndex = 9999995;
document.body.insertBefore(b, document.body.firstChild);

ReactDOM.render(
  <React.StrictMode>
    <Cookie handleClick={mountPopup}/>
  </React.StrictMode>,
  document.getElementById("cookie")
);

window.addEventListener("mouseup", function(event) {
    
  var sel = window.getSelection();
 // var hTag = sel.anchorNode.parentElement;
 // var range = sel.getRangeAt(0);
  //var rect = hTag.getBoundingClientRect();
  //console.log(rect);
  if (isRecipeSite()){
    var selectedText = sel.toString();
    console.log(selectedText);
    replaceOnScreen(selectedText)
  }
});

function isRecipeSite(){
  //selects schema
  var items = document.querySelectorAll('script[type^="application/ld+json"]')
  for (var i=0; i<items.length; i++){
    //check type
    if (items[i].innerText.replace(/ /g, "").includes("\"@type\":\"Recipe\"")){
      return true
    }
  }
  return false
}

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("overlay")
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
