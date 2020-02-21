import React,{ useContext, Dispatch } from 'react';
import { connect } from 'react-redux';
import { productsCatalog } from '../../redux/actions/products';
import ProductConatin from '../../context/product';

interface CatalogITProps extends LinkDispatchesFromStore {
    icon: string
    name: string
    setCatalog: Dispatch<string>
    items: Array<string>
    isOpen: boolean
}

interface LinkDispatchesFromStore {
    productsCatalog: Function
}

const CatalogItem: React.FC<CatalogITProps> = ({ 
    icon,
    name,
    setCatalog,
    items,
    isOpen,
    productsCatalog
}) => {
    let result: any = useContext(ProductConatin);
    result = result || {data : null} ;

    return (
         <li onClick={setCatalog.bind(null,name)}>
             <i className={icon} />
             <span>{name}</span>
            {
                isOpen ? <menu className='subparagraphs' >
                            {items.map((item,index) => (
                                <li onClick={result.data ? result.change.bind(null, { ...result.data,category : item }) : () => { productsCatalog(item,1); result.switchFuncPag(true) }} key={index}>{item}</li>
                            ))}
                        </menu> : null
            }
         </li>
    )
}

export default connect(null,{ productsCatalog } as LinkDispatchesFromStore)(CatalogItem);