import React, {useEffect, useState } from 'react';
import parse from "html-react-parser";
import './Mostrador.scss';
import { Link } from 'react-router-dom';
import ChatService from '../service/chat-service.js';
import TagService from '../service/tag-service.js';
import utilFunctions from '../basico/Util.js'
import EditorIcon from '../assets/colorwheel.webp';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

function Mostrador(props) {
  const uF = new utilFunctions();
  const [chatsInfo, setChatsInfo] = useState("");
  const [color, setColor] = useColor("561ecb");
  const [tags, setTags] = useState({});
  const tagsHtml = {};

  async function getChatData(){
    ChatService.getChatWithLastMessage().then( (res) =>{
      setChatsInfo(res);
    });

  }

  function addNewTag(tag){
    return( 
    <div key={tag.name} 
      style={{backgroundColor: tag.color, color: uF.getContrastYIQ(tag.color)}} 
      className='tag-style'
      >{tag.name}
      </div>); 
  }

  useEffect(() => {
    getChatData();
        
    TagService.getAllTagsByChat().then( (res) =>{
      let dictioary = {}

      for(let i in res){
          let tag = res[i];
          if(tag.chatId == null){
              continue;
          }
          if(!dictioary[tag.chatId]){
              dictioary[tag.chatId] = [];
          }
          dictioary[tag.chatId].push(tag);
      }
      setTags(dictioary);
    });

  }, [])

  for(let t in tags){
    let chat_tags = tags[t];
    if(!tagsHtml[t]){
      tagsHtml[t] = [];
    }
    Object.keys(chat_tags).forEach(function(step) {
      let tag = chat_tags[step];
      tagsHtml[t].push(addNewTag(tag));
    });
  }



  const chat_in_divs = [];
  
  Object.keys(chatsInfo).forEach((step) => {
    let chat_info = chatsInfo[step];



    chat_in_divs.push(
      
      <div className='position-chat-link'>
        
        <div className='showing-tags'>  
          <div className='organizacao-tags'>
            {tagsHtml[chat_info.id]}
          </div>
          <svg className='triangle-tag' width="40" height="20">
            <polygon points="0,0, 18,0, 0,20" fill='#7CBFA7'/>
          </svg>
        </div>
        <Link key={chat_info.id}
          to={{pathname:"/editor"}}  
          state={chat_info.id}
          className='chat-link'>
          <p  className='div-text-caracteristics' 
            style={{color: uF.getContrastYIQ(chat_info.color), backgroundColor: chat_info.color}}>
            {parse(chat_info.text)}
          </p>
        </Link>
        <div className='buttons'>
          <button className='minus-button-chat'
              onClick={() => {
                ChatService.deleteChat(chat_info.id).then((res) => {
                  getChatData();
                });
              }} 
            >
              -
          </button>
          <button className='minus-button-chat colorwheel-icon'
          onClick={() => {
            document.getElementById("page-modal-chat-edit"+chat_info.id).style.display = "flex";
          }}>
            <img src={EditorIcon}></img>
          </button>
        </div>
          
        <div id={"page-modal-chat-edit" + chat_info.id} className='page-modal-chat-edit'>
          <div id="back-modal-criar-chat" onClick={() =>{
            document.getElementById("page-modal-chat-edit"+chat_info.id).style.display = "none";
          }}></div>
          <div id="modal-criar-chat">
            <div  className='position-colorwheel'>
              <div id="colorpicker">
               <ColorPicker 
                hideAlpha={true} 
                hideInput={["rgb", "hsv"]} 
                color={color} 
                onChange={setColor} />
              </div>
            </div>
            
            <button className='create-button'
              onClick={ ()=>{
                ChatService.editChat(chat_info.id, color.hex).then((res) => {
                  getChatData();
                });
                document.getElementById("page-modal-chat-edit"+chat_info.id).style.display = "none";
              }} 
              style={{backgroundColor: color.hex, color:  uF.getContrastYIQ(color.hex)}}
              > Save </button>
          </div>
        </div>

      </div>
    );
  });

  return (
    <div id="todo-mostrador">
      <div id='organize-div'>{chat_in_divs}</div>

      <footer className='rodape'>
        <a href='https://elmigu17.github.io/portifolio/' className='link-my-page'>Made By Miguel</a>
      </footer>
      
    </div>
  );
}

export default Mostrador;
