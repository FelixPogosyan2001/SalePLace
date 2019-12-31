import React from 'react';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';

const Dialog = (props) => {
    let interlocutor = props.messages.find(item => item.sender._id != props.id);
    interlocutor = (interlocutor ? interlocutor.sender : false) || props.messages[props.messages.length - 1].sender;
    
    const startChat = () => {
        props.current({url : props.url,messages : props.messages});
    }

    return (
        <div className='dialog' onClick={startChat}>
            <div className='dialog__avatar' style={{backgroundImage:`url(http://localhost:2001/${interlocutor.avatar})`}}></div>
            <div className='dialog__body'>
                <span>{`${interlocutor.name} ${interlocutor.lastname}`}</span>
                <section className='dialog__lastMessage'>
                    <div style={{backgroundImage:`url(http://localhost:2001/${props.messages[props.messages.length - 1].sender.avatar})`}}>
                        {props.status && <div className='statusConnection'></div>}
                    </div>
                    <span>{props.messages[props.messages.length - 1].text}</span>
                </section>
            </div>
        </div>
    )
}


export default compose(withRouter)(Dialog);