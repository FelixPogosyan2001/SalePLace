import io from 'socket.io-client';
import usersAPI from '../../api/users';
import {AppActions} from '../../additional/actions';
import {Message, Dialog} from '../../additional/interfaces';
import {Dispatch} from 'redux';

var socket: any = null;

export const NEW_MESSAGE = 'NEW_MESSAGE';
export const UPDATE_DIALOGS = 'UPDATE_DIALOGS';
export const CHANGE_STATUS_CONNECTION = 'CHANGE_STATUS_CONNECTION';
export const SET_CURRENT_DIALOG = 'SET_CURRENT_DIALOG';

const updateVersionDialogs = (message: Array<Dialog>): AppActions => ({type : UPDATE_DIALOGS,payload : message});
const addMessage = (message: Message): AppActions  => ({type : NEW_MESSAGE,payload : message});
const stateConnection = (status: boolean): AppActions  => ({type : CHANGE_STATUS_CONNECTION,payload : status});
export const currentDialog = (dialog: Dialog): AppActions  => ({type : SET_CURRENT_DIALOG,payload : dialog})

export const sendMessage = (message: any, format: string = 'chat') => async (dispatch: Dispatch<AppActions>) => {
    if (format == 'chat') {
        socket.emit('message',message.newMessage());
    }

    const myDialogs: Array<Dialog> = await usersAPI.updateDialogs(message.dialog,message.newMessage());
    dispatch(updateVersionDialogs(myDialogs));
}

export const deleteDialog = (url: string) => async (dispatch: Dispatch<AppActions>) => {
    let dialogs: Array<Dialog> = await usersAPI.deleteDialog(url);
    dispatch(updateVersionDialogs(dialogs));
}

export const connectToServer = (urlRoom: string) => async (dispatch: Dispatch<AppActions>) => {
    socket = io.connect('http://localhost:2001');
    socket.emit('connectToRoom',urlRoom);

    socket.on('getMessage',(message: Message | any) => {
        dispatch(addMessage(message));
    })
}