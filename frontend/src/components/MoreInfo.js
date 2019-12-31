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
                {props.isMy ? null : <button onClick={() => setMessageModal(true)}>Write to seller</button>}
            </div>
            <i className="moreInfo__delete fas fa-times" onClick={props.close.bind(this,false)} />
            {createPortal(<MessageForm receiver={props.creator} />,document.body)}
        </div>
    )
}

export default MoreInfo;
