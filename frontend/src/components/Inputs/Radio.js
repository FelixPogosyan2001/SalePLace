import React,{Fragment} from 'react';

export const Radio = ({id,data,change,active}) => {
    const handlerRadio = (e) => {
        if (e.target.id == 'male') change({...data,gender:'male'})
        else  change({...data,gender:'female'})
    };
 
    const stylesRadio = {
        choice : {
            visibility : 'visible'
        },
        radio : {
            border:'2px solid rgb(22, 22, 197)'
        }
    }
   
    return(
        <div className={`inputRadio ${id}`}>
            <input type="radio" id={id} name="radioButton" value={data['gender']} onChange = {handlerRadio} />
            <label style={active ? stylesRadio.radio : {}}  htmlFor={id}><i style={active ? stylesRadio.choice : {}} className="choice"></i></label>
       </div>
    )
}