import React from 'react';
import parse from "html-react-parser";
import './MsgBox.scss'



function MsgBox(props) {

  return(
    <div className='pos_msg'>
        <div className='msg'>

            <p className='text'>
                {parse(props.text)}
            </p>
            <svg className='triangle' width="40" height="40">
                <polygon points="0,0, 30,0, 28,33, 0,36" fill="url(#MyGradient)"/>
                <polygon points="0,0, 18,0, 0,20" fill='#95E6C8'/>


                <defs>
                    <linearGradient id="MyGradient" gradientTransform="rotate(45)">
                        <stop offset="0%" stopColor="#BBB" />
                        <stop offset="51%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            
            </svg>
            
        </div>
    </div>
  );
 

}

export default MsgBox;
