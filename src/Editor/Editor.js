import React, {useEffect, useState } from 'react';
import './Editor.scss';
import MsgBox from './MsgBox';
import arrow from "../assets/arrow.png";
import { useLocation } from 'react-router-dom';
import BackComunication from '../basico/ComunicationBack.js';
import utilFunctions from '../basico/Util.js'

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


  function getTextareaText(){
    let textarea = document.getElementsByTagName("textarea")[0];
    let text = textarea.value;
    text = text.replaceAll("\n", "<br/>");
  
    textarea.value = "";
    setTimeout(() => textarea.style.height = "48px", 1);
  
    
    setTimeout(() => document.getElementById("msgs").style.height = "calc(100% - " + document.getElementById("posText").offsetHeight.toString() + "px - 7px)", 1)
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
        <div className='posDate'> 
          <p className='dateOrganization'>{kay.getDate()}/{kay.getMonth()+1}/{kay.getFullYear()}</p> 
        </div> 
        <MsgBox text={value}></MsgBox> 
      </div>);
    }
    else{
      return( <MsgBox key={date} text={value}></MsgBox>); 
    }
  }

  function addNewTag(tag){
    return( <div key={tag.name} 
      style={{backgroundColor: "#" + tag.color, color: uF.getContrastYIQ("#"+tag.color)}} 
      className='tag_style'
      >{tag.name}
      <button className='minus-button'
        onClick={() => {
          BackComunication.tagChatLinkDelete(tag.id, idText).then(() => {
            getTagsData();
          });
        }} 
      >
        -
      </button>
      </div>); 
  }

  function addNewTagOption(tag){
    return( <option style={{backgroundColor: "#" + tag.color }} key={tag.id} value={tag.id}>{tag.name}</option>); 
  }

  function createNewMessage(){ 
    let newMsg = getTextareaText(); 
    
    if(newMsg !== ""){
      BackComunication.postMessage(newMsg, idText).then( () => {
        BackComunication.getOneChatComplete(idText).then( (res) =>{
          let message = res[res.length-1]
          setMessagens((prevMessages) => [ ...prevMessages, addNewMessage(message['text'], parseInt(message['created_at']))]);

        });
      });
    }
    
  }

  
  function createNewTag(){ 
    let tagColor = document.getElementById("color_for_tag").value;
    let tagName = document.getElementById("name_for_tag").value; 

    BackComunication.postTag(tagColor, tagName, idText).then(() => {
      BackComunication.getTagsByChat(idText).then( (res) =>{
        setTags(res);
      });
    })
  }

  function closeTagEditor(){
      
    document.getElementById("page_modal_tag").style.display = "none";
          
    document.getElementById('modal_criar_tag').style.display = 'none';
    document.getElementsByClassName('select_tag_position')[0].style.display = 'flex';
  }
  
  async function getTagsData(){
    await BackComunication.getTagsByChat(location.state).then( (tagsChatBD) =>{
      BackComunication.getAllTags().then( (res) =>{   

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
        await BackComunication.getLastChatId().then((res)=>{
          setIdText(res[0].id)
          getTagsData();
          BackComunication.getOneChatComplete(idText).then( (res) =>{
            chatInfoEffect = res
          });
          
        })
      }
      else{
        setIdText(location.state)
        await BackComunication.getOneChatComplete(location.state).then( (res) =>{
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
    <div id='todoEditor'>
      <div id='chat'>
        <div id='msgs'>
          {messagens}
        </div>
        <div id='posText'>
          
          <div id='posTagButton'>
            <div id='showing_tags'>  
              <div id='organizacao_tags'>
                {tagsHtml}
              </div>
              <svg className='triangleTag' width="40" height="20">
                <polygon points="0,0, 18,0, 0,20" fill='#A9FFDA'/>
              </svg>
            </div>
            <button onClick={() => {
              document.getElementById("page_modal_tag").style.display = "flex";
            }}
            id='add_tag_button'
            >
              Tags
            </button>
          </div>

          <textarea placeholder='Text' id='textBox'></textarea>

          <div id='posSendButton'>
            <button onClick={ createNewMessage }>
              <img src={arrow} alt="seta de envio">
              </img>
            </button>
          </div>

        </div>
      </div>

      
      <div id="page_modal_tag">
				<div id="back_modal_criar_tag" 
          onClick={closeTagEditor}></div>
        
        <div id="modal_adicionar_tag">
          <div className='select_tag_position'>
            <select name="select_tag" id="select_tag">
              {tagsHtmlAvailable}
            </select>
            <div>
              <button onClick={() => {
                var e = document.getElementById("select_tag");
                var value = e.value;
                BackComunication.postTagChatLink(value, idText).then(() =>{
                  getTagsData();
                });
                closeTagEditor();
                }} >
                Add selected tag
              </button>

              <button onClick={() => {
                document.getElementById('modal_criar_tag').style.display = 'flex';
                document.getElementsByClassName('select_tag_position')[0].style.display = 'none';
                
              }} >
                Create new tag
              </button>
            </div>


          </div>
          <div id="modal_criar_tag">
            <div id="modal_criar_tag_input">
              Color:  
              <input id="color_for_tag"></input>
            </div>
            <div id="modal_criar_tag_input">
              Name:  
              <input id="name_for_tag"></input>
            </div>
            <button 
              id="modal_criar_tag_button" 
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
