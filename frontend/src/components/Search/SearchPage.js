import React,{Fragment} from 'react';
import {connect} from 'react-redux';
import {NotFound} from '../NotFound';
import Product from '../Products/Product';
import photo from '../../images/loupe.png';

const SearchPage = ({foundProducts}) => {
    return (
        <div className='found'>
            {foundProducts.length ? (
                <Fragment>
                    <h1 className='found__title'><img src={photo}/>Found - {foundProducts.length}</h1>
                    {foundProducts.map(foundProduct => (
                        <Product 
                            key={foundProduct._id} 
                            like={() => '12'} 
                            deleteLike={() => '123'} 
                            addInCart = {() => ''}
                            product={{...foundProduct,liked : false}} />
                    ))}
                </Fragment>
            ) : <NotFound />}
        </div>

    )
}

export default connect(({products}) => ({foundProducts : products}))(SearchPage);