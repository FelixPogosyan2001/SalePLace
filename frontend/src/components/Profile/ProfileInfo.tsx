import React,{ useContext } from 'react';
import { RingLoader } from '../loaders/Ring';
import Aside from '../Aside';
import ProfileContext from '../../context/profile';
import Dialogs from '../Dialogs/Dialogs';

const ProfileInfo: React.FC = () => {
    const { user } = useContext(ProfileContext);

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