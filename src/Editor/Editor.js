import React from 'react';
import './Editor.scss';
import MsgBox from './MsgBox';
import arrow from "../assets/arrow.png";


function Editor() {


 
  var texts = new Map();
  texts.set(1653765395554, "Lorem ipsum dolor sit amet,<br>consectetur adipiscing elit.<br>Placerat tortor faucibus<br>mauris eu ut purus a, quam<br>quam. Risus vitae sed eget<br>amet. Laoreet enim interdum<br>mauris, dui est bibendum<br>volutpat. Eget at dolor sagittis<br>faucibus commodo. Arcu<br>quam egestas cras ipsum<br>aliquet aliquet. Est dolor at ");
  texts.set(1653765395654, "Lorem ipsum dolor sit<br>amet, consectetur<br>adipiscing elit. Mi nunc<br>viverra cursus libero<br>est dictum. Eu, vitae<br>risus, facilisi diam<br>aenean viverra sed<br>ultrices mauris. Purus<br>a, arcu pretium dui sed<br>aenean vestibulu.");
  texts.set(1653765495554, "Lorem ipsum<br>dolor sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui<br>ornare pharetra<br>vitae urna. Enim");
  texts.set(1653775495554, "Lorem ipsum dolor<br>sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui ornare<br>pharetra vitae urna.<br>Enim posuere in<br>aliquet consequat<br>ipsum. Amet<br>vestibulum morbi<br>vulputate massa ");


  const chatContent = [];
  texts.forEach(function(value, key) {
    chatContent.push(<MsgBox key={key} text={value}></MsgBox>);
  });
  console.log(chatContent)
  

  return(
    <div className='todo'>
      <div className='chat'>
        <div className='msgs'>
          {chatContent}
        </div>
        <div className='posText'>
          <textarea placeholder='Text' className='textBox'>

          </textarea>
          <div className='posSendButton'>
            <button>
              <img src={arrow}>
              </img>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
 

}

window.addEventListener('load', function () {

  const tx = document.getElementsByTagName("textarea");
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    tx[i].addEventListener("input", OnInput, false);
  }

})


function OnInput() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
}
export default Editor;
