import usersAPI from '../../api/users';
import {toggleLoader} from './commonActions';

export const SIGN_IN = 'SIGN_IN';
export const TOGGLE_LOADER_SIGN_IN = 'TOGGLE_LOADER_SIGN_IN';
export const FIX_DATA_USER = 'FIX_DATA_USER';
export const LOGOUT = 'LOGOUT';

//Action Creators
const setToken = (token) => ({type : SIGN_IN,payload : token});
const fixUser = (user) => ({type : FIX_DATA_USER,payload : user});
export const logout = () => ({type : LOGOUT})

// Thunk Creators
export const signIn = (data) => async (dispatch) => {
    try {
        dispatch(toggleLoader(true,TOGGLE_LOADER_SIGN_IN));
        const token = await usersAPI.signIn(data);
        localStorage.setItem('token',token);
        dispatch(setToken(token));
        dispatch(toggleLoader(false,TOGGLE_LOADER_SIGN_IN));
    } catch(e) {
        dispatch(toggleLoader(false,TOGGLE_LOADER_SIGN_IN));
        return 'User is not defined';
    }
}

export const getUser = () =>  async (dispatch) => {
    const user = await usersAPI.getUser();
    dispatch(fixUser(user))
}

export const editUser = (values) => async (dispatch) => {
    const editedUser = await usersAPI.editUser(values);
    dispatch(fixUser(editedUser));
}
