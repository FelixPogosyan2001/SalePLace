import React from 'react';
import {connect} from 'react-redux';
import {productsCatalog} from '../../redux/actions/products';

const CatalogItem = ({icon,name,setCatalog,items,isOpen,productsCatalog}) => {
    return (
         <li onClick={setCatalog.bind(this,name)}>
             <i className={icon} />
             <span>{name}</span>
            {
                isOpen ? <menu className='subparagraphs' >
                            {items.map((item,index) => (<li onClick={productsCatalog.bind(this,item)} key={index}>{item}</li>))}
                        </menu> : null
            }
         </li>
    )
}

export default connect(null,{productsCatalog})(CatalogItem);