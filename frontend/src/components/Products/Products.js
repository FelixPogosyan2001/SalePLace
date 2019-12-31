import React,{useEffect} from 'react';
import CatalogList from '../Catalog/CatalogList';
import {connect} from 'react-redux';
import Product from './Product';
import {deleteLikeCatalog,likeProductCatalog,getProducts,addViewCatalog} from '../../redux/actions/products';
import {addInCart} from '../../redux/actions/cart';

const Products = ({products,deleteLikeCatalog,likeProductCatalog,getProducts,addViewCatalog}) => {
    useEffect(() => {
        getProducts();
    },[])

    return (
        <div className='products-container'>
            <section className='products-container__products'>
                {products.length > 0 && products.map((product,index) => (
                    <Product 
                         like={likeProductCatalog} 
                         addView={addViewCatalog} 
                         deleteLike={deleteLikeCatalog} 
                         isMy={true} 
                         key={index} 
                         addInCart={addInCart}
                         product={product} />
                ))}
            </section>
            <menu type='list' className="products-container__catalog">
                <CatalogList />
            </menu>
        </div>
    )
}

const mapStateToProps = ({products}) => ({
    products
});

const mapDispatchesToProps = {
    likeProductCatalog,
    deleteLikeCatalog,
    getProducts,
    addViewCatalog,
    addInCart
}

export default connect(mapStateToProps,mapDispatchesToProps)(Products);