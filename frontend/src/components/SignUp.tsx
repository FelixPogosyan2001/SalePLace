import React,{ Fragment, useState } from 'react';
import { Radio } from './Inputs/Radio';
import usersAPI from '../api/users'
import Loading from './loaders/Ellipsis';
import check from '../additional/check';
import InputBox from './Inputs/InputBox';
import { deleteLastItem } from '../additional/helpers';

interface Alert {
    warning: 'error' | 'success'
    text: string
}

const SignUp = () => {
    const [data,setData] = useState({
        name : '',
        lastname:'',
        email : '',
        password : '',
        avatar : '',
        gender:''
    });
    const [alert,setAlert] = useState<Alert>({warning : null, text : null});
    const [loader,setLoader] = useState<boolean>(false);

    const registration = async (): Promise<void> => {  
        if (check(data)) {
            setLoader(true);
            usersAPI.signUp(data);
            setLoader(false);
            setAlert({warning : 'success', text : 'User is registered'});
            setData({
                email: '',
                password: '',
                name: '',
                lastname: '',
                avatar: '',
                gender: ''
            });
        } else  setAlert({warning : 'error',text : 'Field(s) is empty!'});
    }

    return(
        <Fragment>
            <span className={`auth__form__alert_${alert.warning}`}>{alert.text}</span>
            {
                Object.entries(deleteLastItem(data)).map((item,index) => {
                    return(
                        <InputBox 
                        key={index} 
                        id={item[0]} 
                        data={data} 
                        type={item[0] == 'password' ? item[0] : item[0] == 'avatar' ? 'file' : 'text'} 
                        change={setData} />
                    );
                })
            }
            <div className='checkbox-container'>
                <Radio active={false} id='male' change={setData} data={data}/>
                <Radio active={false} id='female' change={setData} data={data} />
            </div>
            <button onClick={registration} type='submit'> {loader ? <Loading /> : 'Sign up'} </button>
        </Fragment>
    )
}

export default SignUp;