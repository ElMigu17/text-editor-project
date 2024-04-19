import React, {useEffect, useState } from 'react';
import parse from "html-react-parser";
import './Mostrador.scss';
import { Link } from 'react-router-dom';
import BackComunication from '../basico/ComunicationBack.js';
import utilFunctions from '../basico/Util.js'
import EditorIcon from '../assets/edit.svg';


function Mostrador(props) {
  const uF = new utilFunctions();
  const [chatsInfo, setChatsInfo] = useState("");
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
      <div className='position_chat_link'>
        <Link key={chat_info.id}
          to={{pathname:"/editor"}}  
          state={chat_info.id}
          className='chat_link'>
          <p  className='divTextCaracteristics' 
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
          <button className='minus-button-chat'
          onClick={() => {
            document.getElementById("page_modal_chat_edit"+chat_info.id).style.display = "flex";
          }}
            >
              <img src={EditorIcon}></img>
            </button>
          </div>
          
        <div id={"page_modal_chat_edit" + chat_info.id} className='page_modal_chat_edit'>
          <div id="back_modal_criar_chat" onClick={() =>{
            document.getElementById("page_modal_chat_edit"+chat_info.id).style.display = "none";
          }}></div>
          <div id="modal_criar_chat">
            <div id="modal_criar_chat_input">
              Color:  
              <input pattern='^#[0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F][0-9A-F].{0,1}$' id={"color_for_chat_edit"+chat_info.id}></input>
            </div>
            
            <button className='minus-button-chat'
              onClick={ ()=>{
                let color = document.getElementById("color_for_chat_edit"+chat_info.id).value;
                BackComunication.editChat(chat_info.id, color).then((res) => {
                  getChatData();
                });
                document.getElementById("page_modal_chat_edit"+chat_info.id).style.display = "none";
              }} 
              > Create </button>
          </div>
        </div>

      </div>
    );
  });

  return (
    <div id="todoMostrador">
      <div id='organizeDiv'>{chat_in_divs}</div>

      <footer className='rodape'>
        <a href='https://elmigu17.github.io/portifolio/' className='link-my-page'>Made By Miguel</a>
      </footer>
      
    </div>
  );
}

export default Mostrador;
