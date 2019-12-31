import React,{useState} from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

export const Private = () => {
    const [map,changeMap] = useState('signIn');
    const focusInput = arg => arg.current.classList.add('focusInputs');
    const blurInput = (value,arg) =>  {
        if (!value) {
            arg.current.classList.remove('focusInputs');
        }
    };
  
    return(
        <div className="auth">
            <div className="auth__photo">
                <div className="auth__photo__info">
                    <h3>What is the use of the <strong>SalePlace?</strong></h3> 
                    <ol>
                        <li>Verified Products by Company</li>
                        <li>The opportunity to discuss the goods with the seller</li>
                        <li>Publication and sale of own goods</li>
                        <li>Product recommendations are based on your choice.</li>
                    </ol>
                </div>
            </div>
            <form className='auth__form' onSubmit={(e) => e.preventDefault()}>
                <p>
                    <span onClick={() => changeMap('signIn')} >Sign In</span>
                    <span onClick={() => changeMap('signUp')} >Sign Up</span>
                </p>
                {map === 'signIn' ? <SignIn focus={focusInput} blur={blurInput}/> : <SignUp focus={focusInput} blur={blurInput}/>}
            </form>
        </div>
    )
}