import React from 'react';
import parse from "html-react-parser";
import './Mostrador.css';

import { useSelector } from 'react-redux';
import  {selectTexts}  from '../basico/TextsSlice.js';
import { Link } from 'react-router-dom';

function Mostrador(props) {
  function getContrastYIQ(hexcolor){
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
  }
  const texts = useSelector(selectTexts);

  const texts_in_divs = [];
  console.log(texts)
  Object.keys(texts).forEach((step, index) => {
    let my_dict = texts[step];
    let last_key = Object.keys(texts[step])[Object.keys(texts[step]).length - 1];
    console.log("stpe", step);
    texts_in_divs.push(

      <Link key={index}
        to={{
            
            pathname:"/editor"}} state={index + 1}>
        <p  className='divTextCaracteristics' style={{color: getContrastYIQ(my_dict["color"]), backgroundColor: "#"+my_dict["color"]}}>
          {parse(my_dict[last_key])}
        </p>
      </Link>
    );
  });

  return (
    <div>
      <div id="todoMostrador">
        <div id='posTitulo'>
          <h1 id='my-title'>Title</h1>
        </div>
        <div id='organizeDiv'>{texts_in_divs}</div>
      </div>

      <footer className='rodape'>
        <a href='https://elmigu17.github.io/portifolio/' className='link-my-page'>Made By Miguel</a>
      </footer>
      
    </div>
  );
}

export default Mostrador;
