import React,{ useEffect, useState, KeyboardEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { connectToServer, sendMessage, currentDialog } from '../redux/actions/communication';
import { AppState } from '../redux/reducers';
import { Person, Dialog } from '../additional/interfaces';
import usersAPI from '../api/users';
import Message from './Dialogs/Message';
import ConstructMessage from './Dialogs/MessageConstructor';

interface LinkStateToProps {
    dialog: Dialog
    sender: Person
}

interface LinkDispatchToProps {
    [propName: string]: Function
}

type ChatProps = LinkStateToProps & LinkDispatchToProps

const Chat: React.FC<ChatProps> = ({
     dialog,
     connectToServer,
     sender,
     sendMessage,
     currentDialog 
}) => {
    const [textMessage,setText] = useState<string>('');
    const ids: Array<string> = dialog.url.split('&&');
    let [receiver,setReceiver] = useState<Person>(null);
    
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

    const send = (e: KeyboardEvent<HTMLInputElement> | boolean): void => {
        if ((e as KeyboardEvent<HTMLInputElement>).charCode == 13 && textMessage.trim().length || typeof(e) == 'boolean') {
            const message = new ConstructMessage(sender,receiver,textMessage);
            sendMessage(message);
            setText('');
        }
    }

    const handlerMessage = (e: ChangeEvent<HTMLInputElement>): void => {
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
                {textMessage && <i onClick={send.bind(null, true)} className="fas fa-paper-plane"></i>}
            </section>
        </div>
    )
}

const mapStateToProps = (state: AppState): LinkStateToProps => ({
    dialog : state.dialogs.currentDialog,
    sender : {
        _id : state.profile._id,
        name : state.profile.name,
        lastname : state.profile.lastname,
        avatar : state.profile.avatar
    }
});

export default connect(
    mapStateToProps,
    { connectToServer, sendMessage, currentDialog } as LinkDispatchToProps
)(Chat);