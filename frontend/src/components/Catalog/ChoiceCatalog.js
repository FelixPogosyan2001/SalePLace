import React,{useState,Fragment} from 'react';
import CatalogList from './CatalogList';

export const ChoiceCatalog = (props) => {
    const [openModal,setModal] = useState(false);

    if (openModal) {
        return (
            <Fragment>
                <menu type='list' className="choiceCatalog">
                    <CatalogList />
                </menu>
                <i onClick={setModal.bind(this,false)} className='fas fa-times'></i>
            </Fragment>
        )
    }
    return (
        <button id='categoryBtn' onClick={setModal.bind(this,true)}>Choose a category</button>
    )
}