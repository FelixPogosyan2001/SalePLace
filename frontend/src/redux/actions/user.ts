import usersAPI from '../../api/users';
import {toggleLoader} from './commonActions';
import {AppActions} from '../../additional/actions';
import {Dispatch} from 'redux';
import { Person } from '../../additional/interfaces';

export const SIGN_IN = 'SIGN_IN';
export const TOGGLE_LOADER_SIGN_IN = 'TOGGLE_LOADER_SIGN_IN';
export const FIX_DATA_USER = 'FIX_DATA_USER';
export const LOGOUT = 'LOGOUT';

interface Client extends Person {
    connection?: boolean
}

//Action Creators
const setToken = (token: string): AppActions => ({type: SIGN_IN, payload: token});
const fixUser = (user: Client): AppActions => ({type: FIX_DATA_USER, payload: user});
export const logout = (): AppActions => ({type: LOGOUT})

// Thunk Creators
export const signIn = (data: { email: string, password: string }) => async (dispatch: Dispatch<AppActions>) => {
    try {
        dispatch(toggleLoader(true,TOGGLE_LOADER_SIGN_IN));
        const token: string = await usersAPI.signIn(data);
        localStorage.setItem('token',token);
        dispatch(setToken(token));
        dispatch(toggleLoader(false,TOGGLE_LOADER_SIGN_IN));
    } catch(e) {
        dispatch(toggleLoader(false,TOGGLE_LOADER_SIGN_IN));
        return 'User is not defined';
    }
}

export const getUser = () =>  async (dispatch: Dispatch<AppActions>) => {
    const user: Client = await usersAPI.getUser();
    dispatch(fixUser(user))
}

export const editUser = (values: Partial<Client>) => async (dispatch: Dispatch<AppActions>) => {
    const editedUser: Client = await usersAPI.editUser(values);
    dispatch(fixUser(editedUser));
}
