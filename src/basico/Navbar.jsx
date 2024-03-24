import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import BackComunication from '../basico/ComunicationBack.js';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <button onClick={() => {
            document.getElementById("page_modal_chat").style.display = "flex";
          }}>a</button>
          <Link to="/editor">+</Link>
        </li>
      </ul>
      <div id="page_modal_chat">
				<div id="back_modal_criar_chat"></div>
        <div id="modal_criar_chat">
					<div id="modal_criar_chat_input">
						Color: 
						<input id="color_for_chat"></input>
					</div>
					<Link id="modal_criar_chat_button" to="/editor" state={null} onClick={() => {
						let color = document.getElementById("color_for_chat").value;
						BackComunication.postChat(color);
            document.getElementById("page_modal_chat").style.display = "none";
          }}> Create </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;