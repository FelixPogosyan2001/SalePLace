import React,{ useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

interface PrivateProps {
    location: {
        pathname: string
        search: string
        hash: string
        state: any
        key: string
    }
}

export const Private: React.FC<PrivateProps> = ({ location }) => {
    const [map,changeMap] = useState('signIn');
    const [loc,setLoc] = useState<string>(location.state);

    const changeLocation = (loc: string): void => {
        setLoc(null);
        changeMap(loc);
    }

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
                    <span onClick={changeLocation.bind(null, 'signIn')} >Sign In</span>
                    <span onClick={changeLocation.bind(null, 'signUp')} >Sign Up</span>
                </p>
                {(map == 'signIn' && loc != 'signUp') ? <SignIn /> : <SignUp />}
            </form>
        </div>
    )
}