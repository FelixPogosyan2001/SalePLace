import React,{useState,useContext} from 'react';
import InputBox from '../Inputs/InputBox';
import {Radio} from '../Inputs/Radio';
import ProfileContext from '../../context/profile';

const Edit = () => {
    const {user,edit} = useContext(ProfileContext);
    const {name,lastname,avatar,gender} = user;
    const [settingsFields,setField] = useState({
        name,
        lastname,
        avatar,
        gender
     });
    let someData = Object.entries(settingsFields);
    someData.pop();
    someData = Object.fromEntries(someData);
    
    return(
        <div className='settings__item__edit'>
            {
                Object.keys(someData).map((item,index) => {
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
            <button onClick={edit.bind(this,settingsFields)}>Save</button>
        </div>
    )
}

export default Edit;