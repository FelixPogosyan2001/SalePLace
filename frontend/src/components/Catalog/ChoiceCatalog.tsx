import React,{ useState, Fragment } from 'react';
import CatalogList from './CatalogList';

export const ChoiceCatalog: React.FC = (props) => {
    const [openModal,setModal] = useState(false);

    if (openModal) {
        return (
            <Fragment>
                <menu type='list' className="choiceCatalog">
                    <CatalogList />
                </menu>
                <i onClick={setModal.bind(null, false)} className='fas fa-times'></i>
            </Fragment>
        )
    }
    
    return (
        <button id='categoryBtn' onClick={setModal.bind(null, true)}>Choose a category</button>
    )
}