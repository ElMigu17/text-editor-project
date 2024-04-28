import React, {useEffect, useState } from 'react';
import './Editor.scss';
import MsgBox from './MsgBox';
import arrow from "../assets/arrow.png";
import { useLocation } from 'react-router-dom';
import ChatService from '../service/chat-service.js';
import TagService from '../service/tag-service.js';
import MessageService from '../service/message-service.js';
import utilFunctions from '../basico/Util.js'
import { ColorPicker, useColor } from "react-color-palette";

function Editor() { 
  const uF = new utilFunctions();
  const tagsHtml = [];
  const tagsHtmlAvailable = [];
  const [tags, setTags] = useState([]);
  const [tagsAvailable, setTagsAvailable] = useState([]);
  const [idText, setIdText] = useState("");
  const [lastDate, setLastDate] = useState({}); 
  const location = useLocation();
  const [messagens, setMessagens] = useState([]);
  const [color, setColor] = useColor("561ecb");



  function getTextareaText(){
    
    let textarea = document.getElementsByTagName("textarea")[0];
    let text = textarea.value;
    text = text.replaceAll("\n", "<br/>");
  
    textarea.value = "";
    setTimeout(() => textarea.style.height = "48px", 1);
  
    
    setTimeout(() => document.getElementById("msgs").style.height = "calc(100% - " + document.getElementById("pos-text").offsetHeight.toString() + "px - 7px)", 1)
    return text;
  }
  
  function addNewMessage(value, date){
    let kay = new Date(date);
    if(lastDate.lastDay !== kay.getDate() || lastDate.lastMonth !== kay.getMonth() || lastDate.lastYear !== kay.getFullYear()){
      
      setLastDate({lastDay:kay.getDate(),lastMonth:kay.getMonth(),lastYear:kay.getFullYear()})

      lastDate.lastDay = kay.getDate(); 
      lastDate.lastMonth = kay.getMonth(); 
      lastDate.lastYear = kay.getFullYear();
  
      return( <div key={date}> 
        <div className='pos-date'> 
          <p className='date-organization'>{kay.getDate()}/{kay.getMonth()+1}/{kay.getFullYear()}</p> 
        </div> 
        <MsgBox text={value}></MsgBox> 
      </div>);
    }
    else{
      return( <MsgBox key={date} text={value}></MsgBox>); 
    }
  }

  function addNewTag(tag){
    return( 
    <div key={tag.name} 
      style={{backgroundColor: tag.color, color: uF.getContrastYIQ(tag.color)}} 
      className='tag-style'
      >{tag.name}
      <button className='minus-button'
        onClick={() => {
          TagService.tagChatLinkDelete(tag.id, idText).then(() => {
            getTagsData();
          });
        }} 
        >
          -
        </button>
      </div>); 
  }

  function addNewTagOption(tag){
    return( <option style={{backgroundColor: tag.color, color: uF.getContrastYIQ(tag.color)}} key={tag.id} value={tag.id}>{tag.name}</option>); 
  }

  function createNewMessage(){ 
    let newMsg = getTextareaText(); 
    
    if(newMsg !== ""){
      MessageService.postMessage(newMsg, idText).then( () => {
        ChatService.getOneChatComplete(idText).then( (res) =>{
          let message = res[res.length-1]
          setMessagens((prevMessages) => [ ...prevMessages, addNewMessage(message['text'], parseInt(message['created_at']))]);

        });
      });
    }
    
  }
  
  function createNewTag(){ 
    let tagName = document.getElementById("name-for-tag").value; 

    TagService.postTag(color.hex, tagName, idText).then(() => {
      TagService.getTagsByChat(idText).then( (res) =>{
        setTags(res);
        closeTagEditor()
      });
    })
  }

  function closeTagEditor(){
      
    document.getElementById("page-modal-tag").style.display = "none";
          
    document.getElementById('modal-criar-tag').style.display = 'none';
    document.getElementsByClassName('select-tag-position')[0].style.display = 'flex';
  }
  
  async function getTagsData(){
    await TagService.getTagsByChat(location.state).then( (tagsChatBD) =>{
      TagService.getAllTags().then( (res) =>{   
        let tags_by_name = {};
        let tags_selecionadas = []

        for(let i in tagsChatBD){
          let tag = tagsChatBD[i];
          tags_by_name[tag.name] = tag;
        }
        for(let i in res){
          let tag = res[i];
          if(tags_by_name[tag.name] === undefined){
            tags_selecionadas.push(tag)
          }
        }
  
        setTags(tagsChatBD);
        setTagsAvailable(tags_selecionadas);
      });
    });
  }
  useEffect(() => {
    setLastDate({
      lastDay: -1,
      lastMonth: -1,
      lastYear: -1 
    })
    const testededemente = async() => {
      let chatInfoEffect = []

      if(!location.state){
        await ChatService.getLastChatId().then((res)=>{
          setIdText(res[0].id);
          getTagsData();
          ChatService.getOneChatComplete(idText).then( (res) =>{
            chatInfoEffect = res
          });
          
        })
      }
      else{
        setIdText(location.state)
        await ChatService.getOneChatComplete(location.state).then( (res) =>{
          getTagsData();
          chatInfoEffect = res
        });  
      }



      if(chatInfoEffect.length > 0 && chatInfoEffect[0]['text'] != null){
        Object.keys(chatInfoEffect).forEach(function(step) {
          let message = chatInfoEffect[step];
          setMessagens((prevMessages) => [ ...prevMessages, addNewMessage(message['text'], parseInt(message['created_at']))]);
        });
      }

      window.addEventListener('load', updateTextarea())
      
      return () => { 
        window.removeEventListener('load', updateTextarea());
      };

    }
    testededemente();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(tags.length > 0 && tags[0]['name'] != null){
    Object.keys(tags).forEach(function(step) {
      let tag = tags[step];
      tagsHtml.push(addNewTag(tag));
    });
  }

  if(tagsAvailable.length > 0 && tagsAvailable[0]['name'] != null){
    Object.keys(tagsAvailable).forEach(function(step) {
      let tag = tagsAvailable[step];
      tagsHtmlAvailable.push(addNewTagOption(tag));
    });
  };

  return(
    <div id='todo-editor'>
      <div id='chat'>
        <div id='msgs'>
          {messagens}
        </div>
        <div id='pos-text'>
          
          <div id='pos-tag-button'>
            <div id='showing-tags'>  
              <div id='organizacao-tags'>
                {tagsHtml}
              </div>
              <svg className='triangle-tag' width="40" height="20">
                <polygon points="0,0, 18,0, 0,20" fill='#A9FFDA'/>
              </svg>
            </div>
            <button onClick={() => {
              document.getElementById("page-modal-tag").style.display = "flex";
            }}
            id='add-tag-button'
            >
              Tags
            </button>
          </div>

          <textarea placeholder='Text' id='text-box'></textarea>

          <div id='pos-send-button'>
            <button onClick={ createNewMessage }>
              <img src={arrow} alt="seta de envio">
              </img>
            </button>
          </div>

        </div>
      </div>

      
      <div id="page-modal-tag">
				<div id="back-modal-criar-tag" 
          onClick={closeTagEditor}></div>
        
        <div id="modal-adicionar-tag">
          <div className='select-tag-position'>
            <select name="select-tag" id="select-tag">
              {tagsHtmlAvailable}
            </select>
            <div>
              <button onClick={() => {
                var e = document.getElementById("select-tag");
                var value = e.value;
                TagService.postTagChatLink(value, idText).then(() =>{
                  getTagsData();
                });
                closeTagEditor();
                }} >
                Add selected tag
              </button>

              <button onClick={() => {
                document.getElementById('modal-criar-tag').style.display = 'flex';
                document.getElementsByClassName('select-tag-position')[0].style.display = 'none';
                
              }} >
                Create new tag
              </button>
            </div>


          </div>
          <div id="modal-criar-tag">
            
            <div  className='position-colorwheel'>
              <div id="colorpicker">
               <ColorPicker 
                hideAlpha={true} 
                hideInput={["rgb", "hsv"]} 
                color={color} 
                onChange={setColor} />
              </div>
            </div>
            <div id="modal-criar-tag-input">
              Name:  
              <input id="name-for-tag"></input>
            </div>
            <button 
              id="modal-criar-tag-button" 
              to="/editor"  
              state={null} 
              onClick={createNewTag}
            > Create </button>
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
