import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {myFavorites} from '../redux/actions/favorites';
import {deleteFavProduct} from '../redux/actions/favorites';
import {addInCart} from '../redux/actions/cart';
import {RingLoader} from './loaders/Ring';
import Product from './Products/Product';

const Favorites = ({myFavorites,favProducts,loader,addInCart,deleteFavProduct}) => {
    useEffect(() => {
        myFavorites();
    },[]);

    console.log(favProducts)
    return (
        <div className="favorites">
            <h1><i className="far fa-star"></i> Favorites - {favProducts.length}</h1>
            {loader ? <RingLoader /> : favProducts.map(favProduct => <Product key={favProduct._id} addInCart={addInCart} deleteLike={deleteFavProduct} product={{...favProduct,liked : true}}/>)}
        </div>
    )
}

const mapStateToProps = ({favorites}) => ({
    favProducts : favorites.favProducts,
    loader : favorites.loader
});

const mapDispatchesToProps = {
    myFavorites,
    addInCart,
    deleteFavProduct
}

export default connect(mapStateToProps,mapDispatchesToProps)(Favorites)