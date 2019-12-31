import React,{useRef} from 'react';
import {useInput} from '../../hooks/input';

const InputBox = (props) => {
    const label = useRef(null);
    
    return(
        <div className="inputBox">
            <label className={props.isEffect ? 'focusInputs' : ''} ref={label} htmlFor={props.id} >{props.id != 'avatar' && props.id[0].toUpperCase() + props.id.slice(1)}</label>
            <input {...useInput(props,label)} />
        </div>
    )
}

export default InputBox;