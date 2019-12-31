import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import {connectToServer,sendMessage,currentDialog} from '../redux/actions/communication';
import Message from './Dialogs/Message';
import ConstructMessage from './Dialogs/MessageConstructor';

const Chat = ({dialog,connectToServer,sender,sendMessage,currentDialog}) => {
    const [textMessage,setText] = useState('');
    const ids = dialog.url.split('&&');
    const receiver = ids.indexOf(sender._id) ? dialog.messages.find(mes => mes.sender._id == ids[0]).sender : dialog.messages.find(mes => mes.sender._id == ids[1]).sender ;
    
    useEffect(() => {
       connectToServer(dialog.url);
    },[])

    const send = (e) => {
        if (e.charCode == 13 && textMessage.trim().length) {
            const message = new ConstructMessage(sender,receiver,textMessage);
            sendMessage(message);
        }
    }

    return (
        <div className='chat'>
            <section className="chat__tools">
                <i className="fas fa-chevron-left" onClick={() => currentDialog(null)}>Back</i>
            </section>
            <section className="messages">
                {
                    dialog.messages.map(({sender,text},index) => (
                        <Message key={index} sender={sender} text={text} />
                    ))
                }
            </section>
            <section className="addingMessage">
                <input 
                    value={textMessage} 
                    onKeyPress={send} 
                    onChange={(e) => setText(e.target.value)} 
                    placeholder='Write a message' />
                {textMessage && <i onClick={send} className="fas fa-paper-plane"></i>}
            </section>
        </div>
    )
}

const mapStateToProps = (state) => ({
    dialog : state.dialogs.currentDialog,
    sender : {
        _id : state.profile._id,
        name : state.profile.name,
        lastname : state.profile.lastname,
        avatar : state.profile.avatar
    }
});

export default connect(mapStateToProps,{connectToServer,sendMessage,currentDialog})(Chat);