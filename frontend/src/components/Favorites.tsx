import React,{ useEffect } from 'react';
import { connect } from 'react-redux';
import { myFavorites, deleteFavProduct, addView } from '../redux/actions/favorites';
import { addInCart } from '../redux/actions/cart';
import { RingLoader } from './loaders/Ring';
import { AppState } from '../redux/reducers';
import { Product as ProductItem, Dispatches } from '../additional/interfaces';
import Product from './Products/Product';

interface LinkState {
    favProducts: Array<ProductItem>
    loader: boolean
}

interface LinkDispatchesFromStore extends Dispatches {
    myFavorites: () => void
    deleteFavProduct: Dispatches['deleteLike']
}

type FavProps = LinkState & LinkDispatchesFromStore

const Favorites: React.FC<FavProps> = ({ 
    myFavorites, 
    favProducts, 
    loader, 
    addInCart, 
    deleteFavProduct, 
    addView 
}) => {

    useEffect(() => {
        myFavorites();
    },[]);

    return (
        <div className="favorites">
            <h1><i className="far fa-star"></i> Favorites - {favProducts.length}</h1>
            {loader ? <RingLoader /> : favProducts.map(favProduct => (
            <Product 
                key={favProduct._id} 
                addInCart={addInCart} 
                deleteLike={deleteFavProduct} 
                addView={addView}
                product={{...favProduct, liked: true}}/> ))}
        </div>
    )
}

const mapStateToProps = ({ favorites }: AppState): LinkState => ({
    favProducts : favorites.favProducts,
    loader : favorites.loader 
});

const mapDispatchesToProps: Partial<LinkDispatchesFromStore> = {
    myFavorites,
    addInCart,
    deleteFavProduct,
    addView
}

export default connect(mapStateToProps,mapDispatchesToProps)(Favorites)