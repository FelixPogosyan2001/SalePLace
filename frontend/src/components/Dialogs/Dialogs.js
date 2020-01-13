import React from 'react';
import {connect} from 'react-redux';
import {currentDialog,deleteDialog} from '../../redux/actions/communication';
import Dialog from './Dialog';
import Chat from '../Chat';
import {NotFound} from '../NotFound';

const Dialogs = (props) => { 
    return (
        <main>
            {
                props.openedDialog ? <Chat /> : !props.dialogs.length ? <NotFound /> : 
                props.dialogs.map(dialog => (
                    <Dialog 
                        key={dialog.url} 
                        id={props.id}
                        current={props.currentDialog}  
                        deleteDialog={props.deleteDialog}
                        {...dialog} />
                ))
            }
        </main>
    )
}

const mapStateToProps = (state) => ({
    dialogs : state.dialogs.dialogs,
    id : state.profile._id,
    openedDialog : state.dialogs.currentDialog
});

export default connect(mapStateToProps,{currentDialog,deleteDialog})(Dialogs);