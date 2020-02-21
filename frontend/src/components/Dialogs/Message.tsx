import React from 'react';
import { Person } from '../../additional/interfaces';

interface MessProps {
    sender: Person
    text: string
    date: string
}

const Message: React.FC<Partial<MessProps>> = ({ sender, text, date }) => { 
    const time: string = date.split(',')[1].slice(0,-3);

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