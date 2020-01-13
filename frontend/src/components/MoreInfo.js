import React,{useState} from 'react';
import {createPortal} from 'react-dom';
import MessageForm from './Dialogs/MessageForm';

const MoreInfo = (props) => {
    const [messageModal,setMessageModal] = useState(false);

    return(
        <div className='moreInfo'>
            <div className='moreInfo__photo' style={{backgroundImage : `url(http://localhost:2001/${props.image})`}}/>
            <div className='moreInfo__body'>
                <h1>{props.title}</h1>
                <p>{props.description}</p>
                <span>{props.price} $</span>
                <div>
                    <div style={{backgroundImage:`url(http://localhost:2001/${props.creator.avatar})`}} /> 
                    <b>{props.creator.name + ' ' + props.creator.lastname}</b>
                </div>
                {localStorage.getItem('token') && <button onClick={() => setMessageModal(true)}>Write to seller</button>}
            </div>
            <i className="moreInfo__delete fas fa-times" onClick={props.close.bind(this,false)} />
            {messageModal && createPortal(<MessageForm close={setMessageModal} receiver={props.creator} />,document.body)}
        </div>
    )
}

export default MoreInfo;
