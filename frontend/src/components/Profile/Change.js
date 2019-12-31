import React,{useState,useContext} from 'react';
import InputBox from '../Inputs/InputBox';
import ProfileContext from '../../context/profile';

const Change = () => {
    const {user,edit} = useContext(ProfileContext);
    const [email,setEmail] = useState(user.email);
    const [password,setPassword] = useState(user.password);
    const [confirmPass,setConfirm] = useState('');
 
    const handlerConfirm = () => {
        if (password != confirmPass) {
            document.querySelectorAll('label').forEach((item,index) => index ? item.setAttribute('style','color:red !important') : '')
            document.querySelectorAll('input').forEach((item,index) => index ? item.classList.add('focusError') : '');
        } else {
            edit({email,password});
        }
    }

    return(
        <div className='settings__item__change'>
            <InputBox id='email' type='text' isEffect={true} data={email} change={setEmail}/>
            <InputBox id='password' type='password' isEffect={true} data={password} change={setPassword}/>
            <InputBox id='confirm password' type='password' isEffect={true} data={confirmPass} change={setConfirm}/>
            <button onClick={handlerConfirm}>Save</button>
        </div>
    )
}

export default Change;