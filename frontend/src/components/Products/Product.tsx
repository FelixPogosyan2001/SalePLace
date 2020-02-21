import React,{ useState } from 'react';
import { createPortal } from 'react-dom';
import { Product as ProductEL, Dispatches } from '../../additional/interfaces';
import MoreInfo from '../MoreInfo';

type ProductProps = { product: ProductEL } & Dispatches

const Product: React.FC<ProductProps> = (props) => {
    const [more,setMore] = useState(false);
    const windowInfo = () => {
       setMore(true);
       props.addView(props.product._id,props.product.views)
    };

    return(
        <div className="product">
            <div className="product__header">
                <div className="product__header__image" style={{backgroundImage:`url(http://localhost:2001/${props.product.image})`}} />
            </div>
            <div className="product__details">
                <p id="product__details__price" >{props.product.price} $</p>
                <p id="product__details__category" >{props.product.category}</p>
                <p id="product__details__title">{props.product.title}</p>
            </div>
            <div className="product__footer">
                <button onClick={windowInfo} >Get More</button>
                <button onClick={props.addInCart.bind(null, props.product)}>Add to Cart</button>
            </div>
            <section className='product__interactive'>
                <i style={{color : props.product.liked ? 'red' : 'black'}} 
                   className="fas fa-heart" 
                   onClick={
                       !props.product.liked ? props.like.bind(null, props.product._id) : 
                       props.deleteLike.bind(null, props.product._id) 
                    }>
                    {props.product.likes}
                </i>
                <i className="fas fa-eye">{props.product.views}</i>
            </section>
            {more ? createPortal(<MoreInfo close={setMore} {...props.product} />, document.body) : null}
        </div>
    )
}

export default Product;