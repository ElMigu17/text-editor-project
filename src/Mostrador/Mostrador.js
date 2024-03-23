import React, {useEffect, useState } from 'react';
import parse from "html-react-parser";
import './Mostrador.css';

import { Link } from 'react-router-dom';
import BackComunication from '../basico/ComunicationBack.js';

function Mostrador(props) {
  const [chatInfo, setChatInfo] = useState("");
  useEffect(() => {
    BackComunication.getChatWithLastMessage().then( (res) =>{
      console.log("aaa", res);
      setChatInfo(res);
    });
  }, [])

  function getContrastYIQ(hexcolor){
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
  }

  const chat_in_divs = [];
  Object.keys(chatInfo).forEach((step, index) => {
    let chat_info = chatInfo[step];
    chat_in_divs.push(
      <Link key={index}
        to={{pathname:"/editor"}} state={index + 1}>
        <p  className='divTextCaracteristics' style={{color: getContrastYIQ(chat_info["color"]), backgroundColor: chat_info["color"]}}>
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
