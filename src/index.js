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
    replaceOnScreen(ingredient, selection);
    //addButton();
}

function showCookie() {

  var myobj = document.getElementById("milk-and-cookies");
  var sel = window.getSelection();
  var selectedText = sel.toString();

  var hTag;
  if (sel.anchorOffset > sel.focusOffset) {
    hTag = sel.anchorNode.parentNode;
  } else {
    hTag = sel.focusNode.parentNode;
  }
  //var hTag = sel.anchorNode.parentNode;
  var range = sel.getRangeAt(0);
  var rect = hTag.getBoundingClientRect();
  var sel = window.getSelection();
    
  var a = document.createElement("div");
  a.id = "milk-and-cookies";
  a.style.height = "20px";
  a.style.width = "20px";
  // a.style.backgroundColor = "red";
  a.style.position = "absolute"//"relative"
  a.style.top = `${((rect.top + rect.bottom) / 2) - 12 + window.scrollY}px`;
  a.style.left = `${rect.right + 10 + window.scrollX}px`;
  a.style.zIndex = 9999999;
  document.body.insertBefore(a, document.body.firstChild);

  function addButton(selection){
    var a = document.createElement("div");
    a.id = "replacementText";
    a.style.height = "100px";
    a.style.width = "100px";
    // a.style.backgroundColor = "red";
    a.style.position = "absolute"
    a.style.top = `${((rect.top + rect.bottom) / 2) - 12 + window.scrollY}px`;
    a.style.left = `${rect.right + 10 + window.scrollX}px`;
    a.style.zIndex = 9999999;
    document.body.insertBefore(a, document.body.firstChild);
    ReactDOM.render(
      <React.StrictMode>
        <TextButton onClick={showDropdown}
                    selection = {selection}
        />
      </React.StrictMode>,
      document.getElementById("replacementText")
    );
  }


  function showDropdown() {
    console.log("hello");

    if (getReplacementOptions(selectedText).length === 0) {
        var myobj = document.getElementById("milk-and-cookies");
        myobj.remove();
        return;
    }
    
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
                  handleSelect={handleSelect}
                  addButton = {addButton}
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

    if (myobj === null && selectedText !== "" && isRecipeSite()) {
        showCookie();

    } else if (myobj !== null) {
        myobj.remove();
        var sel = window.getSelection();
        var selectedText = sel.toString();
        if (selectedText !== "") {
          showCookie();
        }
    }

    if (mydropdown !== null) {
        mydropdown.remove();
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
