import React, {useEffect, useState } from 'react';
import parse from "html-react-parser";
import './Mostrador.css';
import { Link } from 'react-router-dom';
import BackComunication from '../basico/ComunicationBack.js';
import utilFunctions from '../basico/Util.js'

function Mostrador(props) {
  const uF = new utilFunctions();
  const [chatsInfo, setChatsInfo] = useState("");
  useEffect(() => {
    BackComunication.getChatWithLastMessage().then( (res) =>{
      setChatsInfo(res);
    });
  }, [])

  const chat_in_divs = [];
  
  Object.keys(chatsInfo).forEach((step) => {
    let chat_info = chatsInfo[step];
  
    chat_in_divs.push(
      <Link key={chat_info['id']}
        to={{pathname:"/editor"}} state={chat_info['id']}>
        <p  className='divTextCaracteristics' style={{color: uF.getContrastYIQ(chat_info["color"]), backgroundColor: chat_info["color"]}}>
          {parse(chat_info["text"])}
        </p>
      </Link>
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
