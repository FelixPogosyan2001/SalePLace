import React from 'react';

const Message = ({sender,text}) => {
    return (
        <div className='message'>
            <div style={{backgroundImage:`url(http://localhost:2001/${sender.avatar})`}}></div>
            <span id='data'>{`${sender.name} ${sender.lastname}`}</span>
            <span id='text'>{text}</span>
        </div>
    )
}

export default Message;