import React,{useState} from 'react';
import Aside from '../Aside';
import Edit from '../Profile/Edit';
import Change from '../Profile/Change';

const Settings = () => {
    const [isOpen,open] = useState(false);
    return(
        <div className='settings'>
            <Aside/>
            <main>
                <div onClick={() => open('edit')} className='settings__item'>
                    <h2>Edit profile</h2>
                    {isOpen == 'edit' && <Edit />}
                </div>
                <div onClick={() => open('change')} className='settings__item'>
                    <h2>Change login or password</h2>
                    {isOpen == 'change' && <Change/>}
                </div>
            </main>
        </div>
    )
}

export default Settings;