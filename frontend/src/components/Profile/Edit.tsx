import React,{ useState,useContext } from 'react';
import InputBox from '../Inputs/InputBox';
import { Radio } from '../Inputs/Radio';
import ProfileContext from '../../context/profile';
import { deleteLastItem } from '../../additional/helpers';
import { Person } from '../../additional/interfaces';

const Edit: React.FC = () => {
    const { user,edit } = useContext<any>(ProfileContext);
    const { name, lastname, avatar, gender }: Person = user;
    const [settingsFields,setField] = useState({
        name,
        lastname,
        avatar,
        gender
     });
    
    return(
        <div className='settings__item__edit'>
            {
                Object.keys(deleteLastItem(settingsFields)).map((item,index) => {
                    return (
                        <InputBox 
                          key={index}
                          isEffect={true}
                          id={item}
                          type={item =='avatar' ? 'file': 'text'}
                          change={setField}
                          data={settingsFields}
                        />
                    )
                })
            }
            <div className='checkbox-container' >
                <Radio id='male' active={settingsFields.gender == 'male'} change={setField} data={settingsFields}/>
                <Radio id='female' active={settingsFields.gender == 'female'} change={setField} data={settingsFields} />
            </div>
            <button onClick={edit.bind(null, settingsFields)}>Save</button>
        </div>
    )
}

export default Edit;