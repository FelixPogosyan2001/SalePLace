import React,{Fragment,useState,useEffect} from 'react';
import check from '../additional/check';
import InputBox from './Inputs/InputBox';
import Loading from './loaders/Ellipsis';
import {connect} from 'react-redux';
import {signIn} from '../redux/actions/user';

const SignIn = ({signIn,loader,token,}) => {
    const [data,setData] = useState({
        email : '',
        password : ''
    });
    const [alert,setAlert] = useState({warning : '', text : ''});
    
    useEffect(() => {
        if (!token && alert.text) {
            document.querySelectorAll('label').forEach(item => item.setAttribute('style','color:red !important'))
            document.querySelectorAll('input').forEach(item => item.classList.add('focusError'));
        } /*else if (token) {
           window.location = '/profile';
        }*/
    },[token]);

    const sendData = async (meta) => {
        if (!check(meta)) {
            setAlert({warning : 'error',text : 'Field(s) is empty!'});
            return false;
        } else if (!meta.email.includes('@gmail.com') && !meta.email.includes('@mail.ru')) {
            setAlert({warning : 'error',text : 'Format of login is invalid'});
            return false;
        }
        let res = await signIn(meta);
        if (res) setAlert({warning : 'error',text : res})
    }

    return(
        <Fragment>
            <span className={`auth__form__alert_${alert.warning}`}>{alert.text}</span>
            {
                Object.entries(data).map((item,index) => {
                    return(
                        <InputBox 
                        key={index}
                        data={data}
                        id={item[0]} 
                        type={item[0] == 'password' || item[0]=='file' ? item[0] : 'text'} 
                        change={setData} />
                    );
                })
            }
            <button onClick ={sendData.bind(this,data)} type='submit'>{loader ? <Loading /> : 'Next'}</button>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        token : state.auth.token,
        loader : state.auth.loader
    }
};

export default connect(mapStateToProps,{signIn})(SignIn)