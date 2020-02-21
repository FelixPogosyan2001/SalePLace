import React,{ useEffect, useRef } from 'react';
import { recommendations } from '../redux/actions/products'
import { connect } from 'react-redux';
import { myLikes, likeProduct, deleteLike, addView } from '../redux/actions/products';
import { addInCart } from '../redux/actions/cart';
import { AppState } from '../redux/reducers';
import { Product as PR, Dispatches } from '../additional/interfaces';
import Product from './Products/Product';

interface DispatchesToProps extends Dispatches {
    recommendations: () => void
}

const Recommendations: React.FC<DispatchesToProps  & { recommendatedProducts: Array<PR> }> = ({
    recommendations,
    recommendatedProducts,
    like,
    addView,
    deleteLike,
    addInCart
}) => {
    const body = useRef<HTMLDivElement>(null);

    useEffect(() => {
        recommendations();
    },[])

    const go = (): void => {
        body.current.classList.add('afterTranslate')
    }

    const back = (): void => {
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
                            key={product._id} 
                            like={like} 
                            addView={addView} 
                            deleteLike={deleteLike} 
                            addInCart={addInCart}
                            product={product} />
                    ))
                }
            </div>
        </div>
    )
}

const mapDispatchesToProps: DispatchesToProps = {
    recommendations,
    like : likeProduct,
    myLikes,
    deleteLike,
    addView,
    addInCart
};

export default connect(
    ({ recommendations }: AppState) => ({ recommendatedProducts : recommendations }),
    mapDispatchesToProps
)(Recommendations);