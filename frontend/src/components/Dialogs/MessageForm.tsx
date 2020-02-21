import React,{ useState } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../../redux/actions/communication';
import { AppState } from '../../redux/reducers';
import { Person } from '../../additional/interfaces';
import Message from './MessageConstructor';

interface MapStateToProps {
    sender: Person
}

interface MapDispatchToProps {
    sendMessage: (mess: object, mode: string) => void
}

interface OwnProps {
    receiver: Person
    close: (arg: boolean) => void
}

type MFProps = MapDispatchToProps & MapStateToProps & OwnProps

const MessageForm: React.FC<MFProps> = ({ receiver, sender, sendMessage, close }) => {
    const [mess,setMess] = useState('');

    const send = (): void => {
        const message = new Message(sender,receiver,mess);
        sendMessage(message, 'modal');
        setMess('');
    }

    return(
        <div className="message-form">
            <div className='message-modal'>
                <div className='message-modal__header'>
                    <p>New Message</p>
                    <i onClick={close.bind(null, false)} className='fas fa-times' />
                </div>
                <div className='message-modal__body'>
                    <div style={{backgroundImage : `url(http://localhost:2001/${receiver.avatar})`}} className='message-modal__img'></div>
                    <span>{receiver.name + ' ' + receiver.lastname}</span>
                    <textarea onChange={(e) => setMess(e.target.value)} value={mess} placeholder='Write a message'/>
                </div>
                <div className='message-modal__footer'>
                    <button onClick={send} >Send</button>
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = (state: AppState): MapStateToProps => ({
    sender : {
        _id : state.profile._id,
        name : state.profile.name,
        lastname : state.profile.lastname,
        avatar : state.profile.avatar
    }
})

export default connect(mapStateToProps,{ sendMessage } as MapDispatchToProps)(MessageForm);