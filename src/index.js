import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.png';
import App from './App';
import Cookie from './popup/Cookie';
import Dropdown from './highlight/Dropdown';
import HighlightCookie from './highlight/HighlightCookie';
import * as serviceWorker from './serviceWorker';
import {replaceOnScreen, getReplacementOptions} from './extract.js';

// var focused = document.activeElement;
// var selectedText;
// if (focused) {
//     console.log("focused")
//     try {
//         selectedText = focused.value.substring(
//             focused.selectionStart, focused.selectionEnd);
//     } catch (err) {
//         console.log("error")
//     }
// }
// if (selectedText == undefined) {
//     var sel = window.getSelection();
//     var selectedText = sel.toString();
// }

function handleSelect(ingredient, selection) {
    
    console.log(ingredient);
    console.log(selection);
    replaceOnScreen(ingredient, selection);
}

window.addEventListener("mouseup", function(event) {
    
    var myobj = document.getElementById("milk-and-cookies");
    var sel = window.getSelection();
    var selectedText = sel.toString();

    if (myobj === null && selectedText !== "" && isRecipeSite()) {
        var hTag = sel.anchorNode.parentElement;
        var range = sel.getRangeAt(0);
        var rect = hTag.getBoundingClientRect();
        // console.log(rect);
        // console.log(selectedText);
        // console.log(rect.top);
        // console.log(rect.right);
        var sel = window.getSelection();
        // var hTag = sel.anchorNode.parentElement;
        // var range = sel.getRangeAt(0);
          //var rect = hTag.getBoundingClientRect();
          //console.log(rect);
        
          
        var a = document.createElement("div");
        a.id = "milk-and-cookies";
        a.style.height = "20px";
        a.style.width = "20px";
        // a.style.backgroundColor = "red";
        a.style.position = "absolute"
        a.style.top = `${((rect.top + rect.bottom) / 2) - 12 + window.scrollY}px`;
        a.style.left = `${rect.right + 10 + window.scrollX}px`;
        a.style.zIndex = 9999999;
        document.body.insertBefore(a, document.body.firstChild);

        function showDropdown() {
          
          var b = document.createElement("div");
          b.id = "milk-and-cookies-popup";
          b.style.height = "100px";
          b.style.width = "300px";
          b.style.position = "absolute"
          b.style.top = `${((rect.top + rect.bottom) / 2) - 12 + window.scrollY}px`;
          b.style.left = `${rect.right + 40 + window.scrollX}px`;
          b.style.zIndex = 9999999;
          document.body.insertBefore(b, document.body.firstChild);
          
          // var ingredient = {name: "milk",
          //                   selected: "cookies",
          //                   replacements: ["cookies", "more cookies"]}
          var ingredient = {name: selectedText, 
                            selected: null, 
                            replacements: getReplacementOptions(selectedText)} ;
          

          ReactDOM.render(
            <React.StrictMode>
              <Dropdown ingredient={ingredient} 
                        handleSelect={handleSelect}/>
            </React.StrictMode>,
            document.getElementById("milk-and-cookies-popup")
          );}

        ReactDOM.render(
          <React.StrictMode>
            <HighlightCookie onClick={showDropdown}/>
          </React.StrictMode>,
          document.getElementById("milk-and-cookies")
        );

    } else if (myobj !== null) {
        // myobj.remove();
    }

});

// function mountPopup() {
//     var a = document.createElement("div");
//     a.id = "overlay";
//     a.style.width = "100%";
//     a.style.height = "100%";
//     a.style.position = "absolute"
//     a.style.top = "0px"
//     a.style.left = "0px"
//     a.style.zIndex = 9999999;
//     document.body.insertBefore(a, document.body.firstChild);

//     ReactDOM.render(
//       <React.StrictMode>
//         <App />
//       </React.StrictMode>,
//       document.getElementById("overlay")
//     );
// }

// var b = document.createElement("div");
// b.id = "cookie";
// b.style.position = "fixed"
// b.style.bottom = "20px"
// b.style.right = "20px"
// b.style.zIndex = 9999995;
// document.body.insertBefore(b, document.body.firstChild);

// ReactDOM.render(
//   <React.StrictMode>
//     <Cookie handleClick={mountPopup}/>
//   </React.StrictMode>,
//   document.getElementById("cookie")
// );

// window.addEventListener("mouseup", function(event) {
    
//   var sel = window.getSelection();
//  // var hTag = sel.anchorNode.parentElement;
//  // var range = sel.getRangeAt(0);
//   //var rect = hTag.getBoundingClientRect();
//   //console.log(rect);
//   if (isRecipeSite()){
//     var selectedText = sel.toString();
//     console.log(selectedText);
//     replaceOnScreen(selectedText)
//   }
// });

function isRecipeSite(){
  // //selects schema
  // var items = document.querySelectorAll('script[type^="application/ld+json"]')
  // for (var i=0; i<items.length; i++){
  //   //check type
  //   if (items[i].innerText.replace(/ /g, "").includes("\"@type\":\"Recipe\"")){
  //     return true
  //   }
  // }
  // return false
  return true
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
