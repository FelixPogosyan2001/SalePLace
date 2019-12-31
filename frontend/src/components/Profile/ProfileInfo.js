import React,{useContext} from 'react';
import Aside from '../Aside';
import {RingLoader} from '../loaders/Ring';
import ProfileContext from '../context/profile';
import Dialogs from '../Dialogs/Dialogs';

const ProfileInfo = () => {
    const {user} = useContext(ProfileContext);

    if (Object.entries(user).length) {
        return(
            <div className="info">
                <Aside/>
                <Dialogs/>   
            </div>
        )
    } else {
        return <RingLoader />
    }
}

export default ProfileInfo;