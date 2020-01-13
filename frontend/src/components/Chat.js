import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux';
import {connectToServer,sendMessage,currentDialog} from '../redux/actions/communication';
import usersAPI from '../api/users';
import Message from './Dialogs/Message';
import ConstructMessage from './Dialogs/MessageConstructor';

const Chat = ({dialog,connectToServer,sender,sendMessage,currentDialog}) => {
    const [textMessage,setText] = useState('');
    const ids = dialog.url.split('&&');
    let [receiver,setReceiver] = useState(null);
    
    useEffect(() => {
       connectToServer(dialog.url);
       usersAPI
            .getUser(ids[+!ids.indexOf(sender._id)])
            .then(res => setReceiver({
                _id : res._id,
                name : res.name,
                lastname : res.lastname,
                avatar : res.avatar
            }));
    },[])

    const send = (e) => {
        if (e.charCode == 13 && textMessage.trim().length || typeof(e) == 'boolean') {
            const message = new ConstructMessage(sender,receiver,textMessage);
            sendMessage(message);
            setText('');
        }
    }

    const handlerMessage = (e) => {
        setText(e.target.value);
    }

    return (
        <div className='chat'>
            <section className="chat__tools">
                <i className="fas fa-chevron-left" onClick={() => currentDialog(null)}>Back</i>
            </section>
            <section className="messages">
                {
                    dialog.messages.map((message,index) => (
                        <Message key={index} {...message} />
                    ))
                }
            </section>
            <section className="addingMessage">
                <input 
                    value={textMessage} 
                    onKeyPress={send} 
                    onChange={handlerMessage} 
                    placeholder='Write a message' />
                {textMessage && <i onClick={send.bind(this,true)} className="fas fa-paper-plane"></i>}
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