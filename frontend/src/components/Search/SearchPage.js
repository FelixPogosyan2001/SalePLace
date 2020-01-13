import React,{Fragment,useEffect,useState} from 'react';
import {connect} from 'react-redux';
import {deleteLike,likeProduct,addView,myLikes} from '../../redux/actions/products';
import {addInCart} from '../../redux/actions/cart';
import {NotFound} from '../NotFound';
import Product from '../Products/Product';
import photo from '../../images/loupe.png';

const SearchPage = ({foundProducts,like,deleteLike,addInCart,addView,myLikes}) => {
    
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

const mapDispatchesToProps = {
    like : likeProduct,
    myLikes,
    deleteLike,
    addView,
    addInCart
};

export default connect(({products}) => ({foundProducts : products.data}),mapDispatchesToProps)(SearchPage);