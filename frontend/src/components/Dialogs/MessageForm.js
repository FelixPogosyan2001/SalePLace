import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import {sendMessage} from '../../redux/actions/communication';
import Message from './MessageConstructor';

const MessageForm = ({receiver,sender,sendMessage}) => {
    const [mess,setMess] = useState('');

    const send = () => {
        const message = new Message(sender,receiver,mess);
        sendMessage(message,'modal');
    }

    return(
        <div className="message-form">
            <div className='message-modal'>
                <div className='message-modal__header'></div>
                <div className='message-modal__body'>
                    <textarea onChange={(e) => setMess(e.target.value)} value={mess} placeholder='Type a message'/>
                </div>
                <div className='message-modal__footer'>
                    <button onClick={send} >Send</button>
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = (state) => ({
    sender : {
        _id : state.profile._id,
        name : state.profile.name,
        lastname : state.profile.lastname,
        avatar : state.profile.avatar
    }
})

export default connect(mapStateToProps,{sendMessage})(MessageForm);