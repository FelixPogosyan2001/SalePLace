import React from 'react';
import {connect} from 'react-redux';
import {currentDialog} from '../../redux/actions/communication';
import Dialog from './Dialog';
import Chat from '../Chat';

const Dialogs = (props) => { 
    return (
        <main>
            {props.openedDialog ? <Chat /> : props.dialogs.map(dialog => <Dialog id={props.id} current={props.currentDialog} {...dialog} status={props.status} />)}
        </main>
    )
}

const mapStateToProps = (state) => ({
    dialogs : state.dialogs.dialogs,
    id : state.profile._id,
    openedDialog : state.dialogs.currentDialog,
    status : state.profile.connection
});

export default connect(mapStateToProps,{currentDialog})(Dialogs);