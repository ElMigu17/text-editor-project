import React from 'react';
import './Editor.scss';
import MsgBox from './MsgBox';
import arrow from "../assets/arrow.png";
import { useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import  {selectTexts, addTexts}  from '../basico/TextsSlice'
import { type } from '@testing-library/user-event/dist/type';










function getTextareaText(){
  let textarea = document.getElementsByTagName("textarea")[0];
  let text = textarea.value;
  text = text.replaceAll("\n", "<br/>");

  textarea.value = "";
  setTimeout(() => textarea.style.height = "48px", 1);

  
  setTimeout(() => document.getElementById("msgs").style.height = "calc(100% - " + document.getElementById("posText").offsetHeight.toString() + "px - 7px)", 1)
  return text;
}

var lastDay = -1, lastMonth = -1, lastYear = -1;
function addNewMessage(value, key){

  let kay = new Date(key);
  if(lastDay !== kay.getDate() || lastMonth !== kay.getMonth() || lastYear !== kay.getFullYear()){
    
    lastDay = kay.getDate();
    lastMonth = kay.getMonth();
    lastYear = kay.getFullYear();
    
    return( <div key={key}> <div className='posDate'> <p className='dateOrganization'>{lastDay}/{lastMonth+1}/{lastYear}</p> </div> <MsgBox text={value}></MsgBox> </div>);
  }
  else{
    return( <MsgBox key={key} text={value}></MsgBox>); 
  }
}
function Editor() { 
  const provisorio = [];
  const location = useLocation();
  const dispatch = useDispatch();
  var idText = location.state;
  if(typeof idText !== 'number'){
    idText = 1;
  }
  var texts = useSelector(selectTexts)[idText];
  console.log("idText", idText)

  Object.keys(texts).forEach(function(step) {
    if(step !== "color"){
      provisorio.push(addNewMessage(texts[step], parseInt(step)));
    }
  });


  React.useEffect(() => {
    window.addEventListener('load', updateTextarea())
    return () => {
      window.removeEventListener('load', updateTextarea());
    };

  });
  return(
    <div id='todoEditor'>
      <div id='chat'>
        <div id='msgs'>
          {provisorio}
        </div>
        <div id='posText'>
          <textarea placeholder='Text' id='textBox'>

          </textarea>
          <div id='posSendButton'>
            <button onClick={() => {let newMsg = getTextareaText(); if(newMsg !== ""){dispatch(addTexts({"key": Date.now(), "texts": newMsg, "id": idText}))}} }>
              <img src={arrow} alt="seta de envio">
              </img>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
 

}



//window.addEventListener('load', () => updateTextarea())



function updateTextarea() {
  const tx = document.getElementsByTagName("textarea");
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    tx[i].addEventListener("input", OnInput, false);
  }

}

function OnInput() {
  let chatMesgHeight = document.getElementById("msgs").clientHeight;
  let alturaAnterio = parseInt(this.style.height.replace("px", ""));
  this.style.height = "auto";
  let futureHeight = this.scrollHeight;
  this.style.height = (alturaAnterio).toString() + "px";

  if(chatMesgHeight >= 200 || futureHeight < alturaAnterio){
    
    if(alturaAnterio !== futureHeight){
      this.style.height = "auto";
      this.style.height = futureHeight + "px";
      
      let paddingBottom = 5;
      document.getElementById("msgs").style.height = ((chatMesgHeight - paddingBottom) - (futureHeight - alturaAnterio)) + "px";
    }
  }
}
export default Editor;
