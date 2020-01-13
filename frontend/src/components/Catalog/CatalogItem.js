import React,{useContext} from 'react';
import {connect} from 'react-redux';
import {productsCatalog} from '../../redux/actions/products';
import ProductConatin from '../../context/product';

const CatalogItem = ({page,icon,name,setCatalog,items,isOpen,productsCatalog}) => {
    let result = useContext(ProductConatin);
    result = result || {data : null} ;

    return (
         <li onClick={setCatalog.bind(this,name)}>
             <i className={icon} />
             <span>{name}</span>
            {
                isOpen ? <menu className='subparagraphs' >
                            {items.map((item,index) => (
                                <li onClick={result.data ? result.change.bind(this,{...result.data,category : item}) : () => {productsCatalog(item,1);result.switchFuncPag(true)}} key={index}>{item}</li>
                            ))}
                        </menu> : null
            }
         </li>
    )
}

export default connect(null,{productsCatalog})(CatalogItem);