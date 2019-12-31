import React from 'react';
import {connect} from 'react-redux';

const Aside = (props) => {
    return(
        <aside>
            <div style={{backgroundImage:`url(http://localhost:2001/${props.avatar})`}} className='info__image'/>
            <p>{props.name + ' ' + props.lastname}</p>
            <span>
                Email: {props.email}
                <br/><br/>
                Gender : {props.gender}
            </span>
        </aside>
    )
}

const mapStateToProps = (state) => ({
    email : state.profile.email,
    name : state.profile.name,
    lastname : state.profile.lastname,
    avatar : state.profile.avatar,
    gender : state.profile.gender
})

export default connect(mapStateToProps)(Aside);