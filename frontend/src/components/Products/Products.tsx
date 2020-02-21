import React,{ useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Pagination } from '../Pagination';
import { addInCart } from '../../redux/actions/cart';
import { RingLoader } from '../loaders/Ring';
import { NotFound } from '../NotFound';
import { AppState } from '../../redux/reducers';
import { Dispatches, Product as ProductEL } from '../../additional/interfaces';
import ProductContain from '../../context/product';
import CatalogList from '../Catalog/CatalogList';
import Product from './Product';
import {
    deleteLike,
    likeProduct,
    getProducts,
    addView,
    myLikes,
    productsCatalog
} from '../../redux/actions/products';


interface LinkDispatchesToProps extends Dispatches {
    getProducts: (page: number, pageSize?: number) => void
    productsCatalog: (name: string, page: number, pageSize: number) => void
} 

interface LinkState {
    products : Array<ProductEL>
    totalCount : number,
    currentPage : number,
    pageSize : number,
    loader : boolean
}

type ProductsProps = LinkDispatchesToProps & LinkState

const Products: React.FC<ProductsProps> = (props) => {
    const [funcPag,switchFuncPag] = useState(false);

    useEffect(() => {
       props.getProducts(props.currentPage);
    },[]);

    useEffect(() => {
        if (props.products.length > 0) {
            props.myLikes();
        }
    },[props.products]);

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
                )): props.loader ? <RingLoader /> : <NotFound />}
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

const mapStateToProps = ({ products }: AppState): LinkState => ({
    products : products.data,
    totalCount : products.totalCount,
    currentPage : products.currentPage,
    pageSize : products.pageSize,
    loader : products.loader
});

const mapDispatchesToProps: LinkDispatchesToProps = {
    like : likeProduct,
    myLikes,
    deleteLike,
    addView,
    addInCart,
    getProducts,
    productsCatalog
};

export default connect(mapStateToProps,mapDispatchesToProps)(Products);