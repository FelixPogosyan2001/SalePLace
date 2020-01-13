import React,{useEffect,useState} from 'react';
import CatalogList from '../Catalog/CatalogList';
import {connect} from 'react-redux';
import Product from './Product';
import {Pagination} from '../Pagination';
import {deleteLike,likeProduct,getProducts,addView,myLikes,productsCatalog} from '../../redux/actions/products';
import {addInCart} from '../../redux/actions/cart';
import {RingLoader} from '../loaders/Ring';
import {NotFound} from '../NotFound';
import ProductContain from '../../context/product';

const Products = (props) => {
    const [funcPag,switchFuncPag] = useState(false);

    useEffect(() => {
        props.getProducts(props.currentPage);
        props.myLikes();
    },[])

    return (
        <div className='products-container'>
            <section className='products-container__products'>
                {props.products.length > 0 ? props.products.map((product,index) => (
                    <Product 
                         like={props.like} 
                         addView={props.addView} 
                         deleteLike={props.deleteLike} 
                         key={index} 
                         addInCart={props.addInCart}
                         product={product} />
                )) : props.loader ? <RingLoader /> : <NotFound />}
                <Pagination 
                    getProducts={funcPag ? props.productsCatalog : props.getProducts} 
                    current={props.currentPage} 
                    totalCount={props.totalCount} 
                    pageSize={props.pageSize} />
            </section>
            <menu type='list' className="products-container__catalog">
                <ProductContain.Provider value={{switchFuncPag}}>
                    <CatalogList />
                </ProductContain.Provider>
            </menu>
        </div>
    )
}

const mapStateToProps = ({products}) => ({
    products : products.data,
    totalCount : products.totalCount,
    currentPage : products.currentPage,
    pageSize : products.pageSize,
    loader : products.loader
});

const mapDispatchesToProps = {
    like : likeProduct,
    myLikes,
    deleteLike,
    addView,
    addInCart,
    getProducts,
    productsCatalog
};

export default connect(mapStateToProps,mapDispatchesToProps)(Products);