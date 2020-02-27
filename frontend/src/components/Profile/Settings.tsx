import React,{ useState } from 'react';
import Aside from '../Aside';
import Edit from '../Profile/Edit';
import Change from '../Profile/Change';

const Settings: React.FC = () => {
    const [isOpen,open] = useState<boolean | string>(false);
    
    const spectacularClosing = (i: number): void => {
        const settingItem: HTMLDivElement = document.querySelectorAll('.settings__item')[i] as HTMLDivElement;

        settingItem.style.maxHeight = '0px';
        setTimeout(() => {
            open(null);
            settingItem.style.maxHeight = '100vh';
        }, 600);
    }

    return(
        <div className='settings'>
            <Aside/>
            <main>
                <div onClick={() => open('edit')} onDoubleClick={() => spectacularClosing(0)} className='settings__item'>
                    <h2>Edit profile</h2>
                    {isOpen == 'edit' && <Edit />}
                </div>
                <div onClick={() => open('change')} onDoubleClick={() => spectacularClosing(1)} className='settings__item'>
                    <h2>Change login or password</h2>
                    {isOpen == 'change' && <Change/>}
                </div>
            </main>
        </div>
    )
}

export default Settings;