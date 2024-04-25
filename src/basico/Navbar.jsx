import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import BackComunication from '../basico/ComunicationBack.js';
import { ColorPicker, useColor } from "react-color-palette";
import utilFunctions from '../basico/Util.js'

function Navbar() {
  const uF = new utilFunctions();
  const [color, setColor] = useColor("561ecb");
  
  function createChat(){
    BackComunication.postChat(color.hex);
    document.getElementById("page_modal_chat").style.display = "none";
  }
  

  return (
    <nav id="navbar">
      <ul id="navbar-ul">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="li-from-button">
          <button onClick={() => {
            document.getElementById("page_modal_chat").style.display = "flex";
          }}>+</button>
        </li>
      </ul>
      <div id="page_modal_chat">
				<div id="back_modal_criar_chat" onClick={() =>{
          document.getElementById("page_modal_chat").style.display = "none";
        }}></div>
        <div id="modal_criar_chat">
          
          <div className='position-colorwheel'>
            <div id="colorpicker">
              <ColorPicker 
              hideAlpha={true} 
              hideInput={["rgb", "hsv"]} 
              color={color} 
              onChange={setColor} />
            </div>
          </div>

					<Link 
            id="modal-criar-chat-button" 
            className='create-button'
            to="/editor"  
            state={ null}
            onClick={createChat}
            style={{backgroundColor: color.hex, color:  uF.getContrastYIQ(color.hex)}}
          > Create </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;