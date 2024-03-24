import React, {useEffect, useState } from 'react';
import './Editor.scss';
import MsgBox from './MsgBox';
import arrow from "../assets/arrow.png";
import { useLocation } from 'react-router-dom';
import BackComunication from '../basico/ComunicationBack.js';


function getTextareaText(){
  let textarea = document.getElementsByTagName("textarea")[0];
  let text = textarea.value;
  text = text.replaceAll("\n", "<br/>");

  textarea.value = "";
  setTimeout(() => textarea.style.height = "48px", 1);

  
  setTimeout(() => document.getElementById("msgs").style.height = "calc(100% - " + document.getElementById("posText").offsetHeight.toString() + "px - 7px)", 1)
  return text;
}

let lastDay = -1, lastMonth = -1, lastYear = -1;
function addNewMessage(value, date){
  let kay = new Date(date);
  if(lastDay !== kay.getDate() || lastMonth !== kay.getMonth() || lastYear !== kay.getFullYear()){
    
    lastDay = kay.getDate();
    lastMonth = kay.getMonth();
    lastYear = kay.getFullYear();

    return( <div key={date}> <div className='posDate'> <p className='dateOrganization'>{lastDay}/{lastMonth+1}/{lastYear}</p> </div> <MsgBox text={value}></MsgBox> </div>);
  }
  else{
    return( <MsgBox key={date} text={value}></MsgBox>); 
  }
}
function Editor() { 
  
  const definitivo = [];
  const [chatInfo, setChatInfo] = useState("");
  const [idText, setIdText] = useState("");
  const location = useLocation();

  useEffect(() => {
    
    lastDay = -1;
    lastMonth = -1;
    lastYear = -1;
    if(location.state === undefined || location.state === null){
      BackComunication.getLastChatId().then((res)=>{
        setIdText(res[0].id)
      }).then(()=>{

        BackComunication.getOneChatComplete(idText).then( (res) =>{
          setChatInfo(res);
        });
      })
    }
    else{
      setIdText(location.state)
      BackComunication.getOneChatComplete(location.state).then( (res) =>{
        setChatInfo(res);
      });
    }

    window.addEventListener('load', updateTextarea())
    return () => { 
      window.removeEventListener('load', updateTextarea());
    };
  }, [])
  
  if(chatInfo.length > 0 && chatInfo[0]['text'] != null){
    Object.keys(chatInfo).forEach(function(step) {
      let stepChat = chatInfo[step];
      definitivo.push(addNewMessage(stepChat['text'], parseInt(stepChat['created_at'])));
    });
  }

  return(
    <div id='todoEditor'>
      <div id='chat'>
        <div id='msgs'>
          {definitivo}
        </div>
        <div id='posText'>
          <textarea placeholder='Text' id='textBox'>

          </textarea>
          <div id='posSendButton'>
            <button onClick={() => {
              lastDay = -1;
              lastMonth = -1;
              lastYear = -1;
              let newMsg = getTextareaText(); 
              if(newMsg !== ""){
                BackComunication.postMessage(newMsg, idText).then( (res1) => {
                  BackComunication.getOneChatComplete(idText).then( (res) =>{
                    setChatInfo(res);
                  });
                });
              }
            }}>
              <img src={arrow} alt="seta de envio">
              </img>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
 

}


function updateTextarea() {
  const tx = document.getElementsByTagName("textarea")[0];
  if(tx !== undefined && tx.scrollHeight < 58 ){  
    tx.setAttribute("style", "height:" + (tx.scrollHeight) + "px;overflow-y:hidden;");
    tx.addEventListener("input", OnInput, false); 
  }
}

function OnInput() {
  let chatMesgHeight = document.getElementById("msgs").clientHeight;
  let alturaAnterio = parseInt(this.style.height.replace("px", ""));
  this.style.height = "auto";
  let futureHeight = this.scrollHeight;
  let futureAddedHeight = futureHeight - alturaAnterio;
  futureHeight = chatMesgHeight-(futureAddedHeight) > 200 ? futureHeight : maxChatHeight();
  this.style.height = (alturaAnterio).toString() + "px";
    
  if(alturaAnterio !== futureHeight){
    this.style.height = "auto";
    this.style.height = futureHeight + "px";
    let paddingBottom = 5;

    document.getElementById("msgs").style.height = ((chatMesgHeight - paddingBottom) - (futureAddedHeight)) + "px";
  }
  
}

function maxChatHeight(){
  let chat = document.getElementById("chat");
  let chatHeight = chat.clientHeight;
  return chatHeight/2;
}

export default Editor;
