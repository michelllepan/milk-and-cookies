import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.png';
import App from './App';
import Cookie from './popup/Cookie';
import Dropdown from './highlight/Dropdown';
import HighlightCookie from './highlight/HighlightCookie';
import TextButton from './highlight/TextButton';
import * as serviceWorker from './serviceWorker';
import {replaceOnScreen, getReplacementOptions} from './extract.js';

function handleSelect(ingredient, selection) {
    
    console.log(ingredient);
    console.log(selection);
    //replaceOnScreen(ingredient, selection);
    //addButton();
}

var start;

function showCookie() {

  var myobj = document.getElementById("milk-and-cookies");
  var sel = window.getSelection();
  var selectedText = sel.toString();

  var hTag;
  if (sel.anchorOffset > sel.focusOffset) {
    hTag = sel.anchorNode.parentNode;
    start = sel.focusNode.parentNode;
  } else {
    hTag = sel.focusNode.parentNode;
    start = sel.anchorNode.parentNode;
  }
  //var hTag = sel.anchorNode.parentNode;
  var range = sel.getRangeAt(0);
  var rect = hTag.getBoundingClientRect();
  var rect2 = start.getBoundingClientRect();
  var sel = window.getSelection();
    
  var a = document.createElement("div");
  a.id = "milk-and-cookies";
  a.style.height = "20px";
  a.style.width = "20px";
  // a.style.backgroundColor = "red";
  a.style.position = "absolute"//"relative"
  console.log("=========positioning rect==========")
  console.log(rect.top)
  console.log(rect.bottom)
  a.style.top = `${((rect.top + rect.bottom) / 2) - 12 + window.scrollY}px`;
  a.style.left = `${rect.right + 10 + window.scrollX}px`;
  a.style.zIndex = 9999999;
  document.body.insertBefore(a, document.body.firstChild);




  function showDropdown(selection) {
    console.log("hello");

    //if (getReplacementOptions(selectedText).length === 0) {
        var myobj = document.getElementById("milk-and-cookies");
        myobj.remove();
        //return;
    //}
    
    var b = document.createElement("div");
    b.id = "milk-and-cookies-popup";
    b.style.height = 'auto';
    b.style.width = 'auto';
    b.style.position = "absolute"
    console.log("=========positioning rect2==========")
    console.log(rect2.top)
    console.log(rect2.bottom)
    b.style.top = `${((rect2.top + rect2.bottom) / 2) - 22 + window.scrollY}px`;
    b.style.left = `${rect2.right - rect2.width + window.scrollX}px`;
    b.style.zIndex = 9999999;
    document.body.insertBefore(b, document.body.firstChild);
    
    // var ingredient = {name: "milk",
    //                   selected: "cookies",
    //                   replacements: ["cookies", "more cookies"]}
    let replacements = getReplacementOptions(selectedText).map(r => replaceOnScreen(selectedText, r))
    replacements.push(selectedText)
    var ingredient = {name: selectedText, 
                      selected: selection, 
                      replacements: replacements} ;
    

    ReactDOM.render(
      <React.StrictMode>
        <Dropdown ingredient={ingredient} 
                  handleSelect={handleSelect}
                  />
      </React.StrictMode>,
      document.getElementById("milk-and-cookies-popup")
    );}

  ReactDOM.render(
    <React.StrictMode>
      <HighlightCookie onClick={showDropdown}/>
    </React.StrictMode>,
    document.getElementById("milk-and-cookies")
  );

}

window.addEventListener("mouseup", function(event) {

    console.log("here is an event");
    console.log(event);
    
    var myobj = document.getElementById("milk-and-cookies");
    var mydropdown = document.getElementById("milk-and-cookies-popup");
    var sel = window.getSelection();
    var selectedText = sel.toString();
    console.log(getReplacementOptions(selectedText).length)
    if (myobj === null && selectedText !== "" && isRecipeSite() && getReplacementOptions(selectedText).length!=0) {
        console.log("CALLING SHOW COOKIE 1")
        showCookie();

    } else if (myobj !== null && getReplacementOptions(selectedText).length!=0) {
        myobj.remove();
        var sel = window.getSelection();
        var selectedText = sel.toString();
        if (selectedText !== "") {
          console.log("CALLING SHOW COOKIE 2")
          showCookie();
        }
    }

    // if (mydropdown !== null) {
    //     mydropdown.remove();
    // }

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
