import React from 'react';

const Message = ({sender,text,date}) => { 
    const time = date.split(',')[1].slice(0,-3);

    return (
        <div className='message'>
            <div style={{backgroundImage:`url(http://localhost:2001/${sender.avatar})`}}></div>
            <span id='data'>
                {`${sender.name} ${sender.lastname}`}
                <time>{time}</time>
            </span>
            <span id='text'>{text}</span>
        </div>
    )
}

export default Message;