import React,{useEffect,useRef} from 'react';
import {recommendations} from '../redux/actions/products'
import { connect } from 'react-redux';
import {myLikes,likeProduct,deleteLike,addView} from '../redux/actions/products';
import {addInCart} from '../redux/actions/cart';
import Product from './Products/Product';

const Recommendations = ({recommendations,recommendatedProducts,like,addView,deleteLike,addInCart}) => {
    const body = useRef(null);

    useEffect(() => {
        recommendations();
    },[])

    const go = () => {
        body.current.classList.add('afterTranslate')
    }

    const back = () => {
        body.current.classList.remove('afterTranslate')
    }

    return (
        <div className='recommendations' style={{display:recommendatedProducts.length < 6 ? 'none' : 'block'}}>
            <div className='back' onClick={back}>
                <i className="fas fa-chevron-left"></i>
            </div>
            <div className='go' onClick={go}>
                <i className="fas fa-chevron-right"></i>
            </div>
            <h2 className='recommendations__title'>Recommendations</h2>
            <div className='recommendations__body' ref={body}>
                {
                    recommendatedProducts.map(product => (
                        <Product 
                            like={like} 
                            addView={addView} 
                            deleteLike={deleteLike} 
                            isMy={true} 
                            key={product._id} 
                            addInCart={addInCart}
                            product={product} />
                    ))
                }
            </div>
        </div>
    )
}

const mapDispatchesToProps = {
    recommendations,
    like : likeProduct,
    myLikes,
    deleteLike,
    addView,
    addInCart
};

export default connect(({recommendations}) => ({recommendatedProducts : recommendations}),mapDispatchesToProps)(Recommendations)