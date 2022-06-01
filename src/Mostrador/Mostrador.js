import React from 'react';
import parse from "html-react-parser";
import './Mostrador.css';

function Mostrador() {

  function getContrastYIQ(hexcolor){
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
  }
 
  const texts = [{"text": "Lorem ipsum dolor sit<br>amet, consectetur<br>adipiscing elit. Mi nunc<br>viverra cursus libero<br>est dictum. Eu, vitae<br>risus, facilisi diam<br>aenean viverra sed<br>ultrices mauris. Purus<br>a, arcu pretium dui sed<br>aenean vestibulu.", "color": "2A4036"}, 
  {"text": "Lorem ipsum dolor sit amet,<br>consectetur adipiscing elit.<br>Placerat tortor faucibus<br>mauris eu ut purus a, quam<br>quam. Risus vitae sed eget<br>amet. Laoreet enim interdum<br>mauris, dui est bibendum<br>volutpat. Eget at dolor sagittis<br>faucibus commodo. Arcu<br>quam egestas cras ipsum<br>aliquet aliquet. Est dolor at ", "color": "53806F"}, 
  {"text": "Lorem ipsum<br>dolor sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui<br>ornare pharetra<br>vitae urna. Enim", "color": "63AA90"}, 
  {"text": "Lorem ipsum dolor<br>sit amet,<br>consectetur<br>adipiscing elit.<br>Euismod dui ornare<br>pharetra vitae urna.<br>Enim posuere in<br>aliquet consequat<br>ipsum. Amet<br>vestibulum morbi<br>vulputate massa ", "color": "95E6C8"}, 
  {"text": "Lorem ipsum dolor sit amet, consectetur<br>adipiscing elit. Euismod dui ornare<br>pharetra vitae urna. Enim posuere in<br>aliquet consequat ipsum. Amet vestibulum<br>morbi vulputate massa aliquam blandit.<br>Purus posuere etiam aliquet bibendum ", "color": "3E5F50"}, 
  {"text": "Lorem ipsum dolor sit amet,<br>consectetur adipiscing elit.<br>Euismod dui ornare pharetra<br>vitae urna. Enim posuere in<br>aliquet consequat ipsum. Amet<br>vestibulum morbi vulputate<br>massa aliquam blandit. Purus<br>posuere etiam aliquet<br>bibendum ipsum felis<br>adipiscing. Egestas pretium<br>pharetra lectus euismod.<br>Imperdiet nibh egestas done", "color": "7CBFA7"}, 
  {"text": "Lorem ipsum dolor sit<br>amet, consectetur<br>adipiscing elit. Mi nunc<br>viverra cursus libero<br>est dictum. Eu, vitae<br>risus, facilisi diam<br>aenean viverra sed<br>ultrices mauris. Purus<br>a, arcu pretium dui sed<br>aenean vestibulu.", "color": "53806F"}, 
  {"text": "Lorem ipsum dolor<br>sit amet,<br>consectetur<br>adipiscing elit.<br>Placerat tortor<br>faucibus mauris eu<br>ut purus a, quam<br>quam. Risus vitae<br>sed eget amet.<br>Laoreet enim<br>interdum mauris,<br>dui est bibendum<br>volutpat. Eget at<br>dolor sagittis<br>faucibus<br>commodo. Arcu ", "color": "53806F"}, 
  {"text": "Lorem ipsum dolor sit<br>amet, consectetur<br>adipiscing elit. Mi nunc<br>viverra cursus libero<br>est dictum. Eu, vitae<br>risus, facilisi diam<br>aenean viverra sed<br>ultrices mauris. Purus<br>a, arcu pretium dui sed<br>aenean vestibulu.", "color" : "2A4036"}]


  const texts_in_divs = texts.map((step, index) => {
    return(
      <p key={index} className='divTextCaracteristics' style={{color: getContrastYIQ(step["color"]), backgroundColor: "#"+step["color"]}}>
        {parse(step["text"])}
      </p>
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
