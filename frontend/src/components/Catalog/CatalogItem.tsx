import React,{ useContext, Dispatch, useRef } from 'react';
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
    const menuCatalog = useRef<HTMLElement>(null);
    let result: any = useContext(ProductConatin);
    result = result || {data : null} ;

    const closeCatalog = (): void => {
        menuCatalog.current.style.maxHeight = '0px';
        setTimeout(() => setCatalog(null), 500);
    }

    return (
         <li onClick={setCatalog.bind(null, name)} onDoubleClick={closeCatalog}>
             <i className={icon} />
             <span>{name}</span>
            {
                isOpen ? <menu className='subparagraphs' ref={menuCatalog} >
                            {items.map((item,index) => (
                                <li 
                                    key={index}
                                    onClick={
                                        result.data ? result.change.bind(null, { ...result.data,category : item }) : 
                                        () => { productsCatalog(item,1); result.switchFuncPag(true) }
                                    } 
                                >{item}</li>
                            ))}
                        </menu> : null
            }
         </li>
    )
}

export default connect(null,{ productsCatalog } as LinkDispatchesFromStore)(CatalogItem);