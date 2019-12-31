import io from 'socket.io-client';
import usersAPI from '../../api/users';

var socket = null;

export const NEW_MESSAGE = 'NEW_MESSAGE';
export const UPDATE_DIALOGS = 'UPDATE_DIALOGS';
export const CHANGE_STATUS_CONNECTION = 'CHANGE_STATUS_CONNECTION';
export const SET_CURRENT_DIALOG = 'SET_CURRENT_DIALOG';

const updateVersionDialogs = (message) => ({type : UPDATE_DIALOGS,payload : message});
const addMessage = (message) => ({type : NEW_MESSAGE,payload : message});
const stateConnection = (status) => ({type : CHANGE_STATUS_CONNECTION,payload : status});
export const currentDialog = (dialog) => ({type : SET_CURRENT_DIALOG,payload : dialog})

export const sendMessage = (message,format = 'chat') => async (dispatch) => {
    if (format == 'modal'){
        const myDialogs = await usersAPI.updateDialogs(message.dialog,message.newMessage());
        dispatch(updateVersionDialogs(myDialogs))
    } else if (format == 'chat') {
        socket.emit('message',message.newMessage());
        await usersAPI.updateDialogs(message.dialog,message.newMessage());
    }
}

export const connectToServer = (urlRoom) => async (dispatch) => {
    socket = io.connect('http://localhost:2001');
    socket.emit('connectToRoom',urlRoom);

    socket.on('getMessage',(message) => {
        dispatch(addMessage(message));
        //dispatch(updateVersionDialogs(myDialogs));
    })

    dispatch(stateConnection(true));
}