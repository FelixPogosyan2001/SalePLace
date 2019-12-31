import React,{useState} from 'react';
import CatalogItem from './CatalogItem';
import catalog from '../../additional/catalog';
import icons from '../../additional/icons';

const CatalogList = () => {
    const [isOpenCatalog,setCatalog] = useState(null);

    return (
        Object.entries(catalog).map((item,i) => {
            if (isOpenCatalog == item[0]) {
                return (<CatalogItem 
                        setCatalog={setCatalog} 
                        name={item[0]} 
                        isOpen={true} 
                        items={item[1]} 
                        key={i} 
                        icon={icons[i]} />)
            }
            return (<CatalogItem 
                    setCatalog={setCatalog} 
                    name={item[0]} 
                    items={item[1]} 
                    key={i} 
                    icon={icons[i]} />)
        })
    )
}

export default CatalogList;