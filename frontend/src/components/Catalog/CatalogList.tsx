import React,{ useState, Fragment } from 'react';
import CatalogItem from './CatalogItem';
import catalog from '../../additional/catalog';
import icons from '../../additional/icons';

const CatalogList: React.FC = () => {
    const [isOpenCatalog,setCatalog] = useState<string>(null);

    return (
        <Fragment>
            { Object.entries(catalog).map((item, i) => (
                <CatalogItem 
                   setCatalog={setCatalog} 
                   name={item[0]} 
                   isOpen={isOpenCatalog == item[0] ? true : false} 
                   items={item[1]} 
                   key={i} 
                   icon={icons[i]} />
            
            )) }
        </Fragment>
    )
}

export default CatalogList;