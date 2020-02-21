import React,{ Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteLike, likeProduct, addView, myLikes } from '../../redux/actions/products';
import { addInCart } from '../../redux/actions/cart';
import { NotFound } from '../NotFound';
import { AppState } from '../../redux/reducers';
import Product from '../Products/Product';
import photo from '../../images/loupe.png';
import { Product as ProductArg, Dispatches } from '../../additional/interfaces';

interface PropsFromStore {
    foundProducts: Array<ProductArg>
}

type PropsSP = Dispatches & PropsFromStore

const SearchPage: React.FC<PropsSP> = ({ 
    foundProducts, 
    like, 
    deleteLike, 
    addInCart, 
    addView, 
    myLikes 
}) => {
    
    useEffect(() => {
        if (foundProducts.length) {
            myLikes();
        }
    },[foundProducts]);

    return (
        <div className='found'>
            {foundProducts.length ? (
                <Fragment>
                    <h1 className='found__title'><img src={photo}/>Found - {foundProducts.length}</h1>
                    {foundProducts.map(foundProduct => (
                        <Product 
                            key={foundProduct._id} 
                            like={like} 
                            deleteLike={deleteLike} 
                            addInCart = {addInCart}
                            addView={addView}
                            product={foundProduct} />
                    ))}
                </Fragment>
            ) : <NotFound />}
        </div>

    )
}

const mapDispatchesToProps: Dispatches = {
    like : likeProduct,
    myLikes,
    deleteLike,
    addView,
    addInCart
};

export default connect(
    ({ products }: AppState): PropsFromStore => ({ foundProducts : products.data }),
    mapDispatchesToProps
)(SearchPage);