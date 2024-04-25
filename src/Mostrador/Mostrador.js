import React, {useEffect, useState, Fragment } from 'react';
import parse from "html-react-parser";
import './Mostrador.scss';
import { Link } from 'react-router-dom';
import BackComunication from '../basico/ComunicationBack.js';
import utilFunctions from '../basico/Util.js'
import EditorIcon from '../assets/colorwheel.webp';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

function Mostrador(props) {
  const uF = new utilFunctions();
  const [chatsInfo, setChatsInfo] = useState("");
  const [color, setColor] = useColor("561ecb");

  async function getChatData(){
    BackComunication.getChatWithLastMessage().then( (res) =>{
      setChatsInfo(res);
    });

  }

  useEffect(() => {
    getChatData()
  }, [])

  const chat_in_divs = [];
  
  Object.keys(chatsInfo).forEach((step) => {
    let chat_info = chatsInfo[step];
    chat_in_divs.push(
      <div className='position-chat-link'>
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
                BackComunication.deleteChat(chat_info.id).then((res) => {
                  getChatData();
                });
              }} 
            >
              -
          </button>
          <button className='minus-button-chat colorwheel-icon'
          onClick={() => {
            document.getElementById("page-modal-chat-edit"+chat_info.id).style.display = "flex";
          }}
            >
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
                BackComunication.editChat(chat_info.id, color.hex).then((res) => {
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
