import React,{useEffect,useState} from 'react';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import usersAPI from '../../api/users';

const Dialog = (props) => {
    let [date,setDate] = useState();
    let [interlocutor,setInterlocutor] = useState({});
    let deleted = false;
    const ids = props.url.split('&&');

    useEffect(() => {
        usersAPI
        .getUser(ids[+!ids.indexOf(props.id)])
        .then(res => setInterlocutor({
            _id : res._id,
            name : res.name,
            lastname : res.lastname,
            avatar : res.avatar
        }));
    },[])

    useEffect(() => {
        let lastDate = props.messages[props.messages.length - 1].date.split(',');
        let currentDate = new Date().toLocaleString().split(',');

        if (lastDate[0].slice(3) === currentDate[0].slice(3)) {
            let difference = +currentDate[0].slice(0,2) - +lastDate[0].slice(0,2);
            setDate((difference == 1) ? 'yesterday' : (difference == 0) ? lastDate[1].slice(0,-3) : `${difference} days ago`); 
        } else {
            setDate(lastDate[0]);
        }
    },[props.messages]);

    const startChat = () => {
        if (!deleted) {
            props.current({url : props.url,messages : props.messages});
        }
    }
    
    const deleteDialog = () => {
       deleted = true;
       props.deleteDialog(props.url);
    }

    return (
        <div className='dialog' onClick={startChat}>
            <div className='dialog__avatar' style={{backgroundImage:`url(http://localhost:2001/${interlocutor.avatar})`}}></div>
            <div className='dialog__body'>
                <span>{`${interlocutor.name} ${interlocutor.lastname}`}</span>
                <section className='dialog__lastMessage'>
                    <div style={{backgroundImage:`url(http://localhost:2001/${props.messages[props.messages.length - 1].sender.avatar})`}}> </div>
                    <span>{props.messages[props.messages.length - 1].text}</span>
                    <time>{date}</time>
                </section>
            </div>
            <i onClick={deleteDialog} className='fas fa-times'></i>
        </div>
    )
}


export default compose(withRouter)(Dialog);