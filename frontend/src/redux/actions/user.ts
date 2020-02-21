import usersAPI from '../../api/users';
import {toggleLoader} from './commonActions';
import {AppActions} from '../../additional/actions';
import {Dispatch} from 'redux';

export const SIGN_IN = 'SIGN_IN';
export const TOGGLE_LOADER_SIGN_IN = 'TOGGLE_LOADER_SIGN_IN';
export const FIX_DATA_USER = 'FIX_DATA_USER';
export const LOGOUT = 'LOGOUT';

interface User {
    _id: string
    email: string
    password: string
    name: string
    lastname: string
    avatar: string
    gender: string
    connection: boolean
}

//Action Creators
const setToken = (token: string): AppActions => ({type: SIGN_IN, payload: token});
const fixUser = (user: User): AppActions => ({type: FIX_DATA_USER, payload: user});
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
    const user: User = await usersAPI.getUser();
    dispatch(fixUser(user))
}

export const editUser = (values: Partial<User>) => async (dispatch: Dispatch<AppActions>) => {
    const editedUser: User = await usersAPI.editUser(values);
    dispatch(fixUser(editedUser));
}
