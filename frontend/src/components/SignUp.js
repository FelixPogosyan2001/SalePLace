import React,{Fragment,useState} from 'react';
import usersAPI from '../api/users'
import Loading from './loaders/Ellipsis';
import check from '../additional/check';
import InputBox from './Inputs/InputBox';
import {Radio} from './Inputs/Radio';

const SignUp = () => {
    const [data,setData] = useState({
        name : '',
        lastname:'',
        email : '',
        password : '',
        avatar : '',
        gender:''
    });
    const [alert,setAlert] = useState({warning : '', text : ''});
    const [loader,setLoader] = useState(false);
    let someData = Object.entries(data);
    someData.pop();
    someData = Object.fromEntries(someData);

    const registration = async () => {  
        if (check(data)) {
            setLoader(true);
            usersAPI.signUp(data);
            setLoader(false);
            setAlert({warning : 'success', text : 'User is registered'});
            setData({email:'',password:'',name:'',lastname:'',file:''});
        } else setAlert('error','Field(s) is empty!','signUp')
    }

    return(
        <Fragment>
            <span className={`auth__form__alert_${alert.warning}`}>{alert.text}</span>
            {
                Object.entries(someData).map((item,index) => {
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
                <Radio id='male' change={setData} data={data}/>
                <Radio id='female' change={setData} data={data} />
            </div>
             
            <button onClick={registration} type='submit'> {loader ? <Loading /> : 'Sign up'} </button>
        </Fragment>
    )
}

export default SignUp;