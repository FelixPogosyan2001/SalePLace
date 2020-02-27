import React,{ useEffect, useState } from 'react';
import { recommendations } from '../redux/actions/products'
import { connect } from 'react-redux';
import { myLikes, likeProductRec, deleteLikeFromRec, addViewInRec } from '../redux/actions/products';
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
    const [slides,setSlides] = useState(['r-1','r-2']);

    useEffect(() => {
        recommendations();
    },[])

    const replaceSlide = (direction: string): void => {
        const r1: HTMLDivElement = document.querySelector('.r-1') as HTMLDivElement;
        const r2: HTMLDivElement = document.querySelector('.r-2') as HTMLDivElement;

        r1.classList.add(`${direction}-main`);
        r2.classList.add(`${direction}-secondary`);
        setTimeout(() => setSlides([...slides.reverse()]), 1000);
    }

    return (
        <div className='recommendations' style={{display: recommendatedProducts.length <= 6 ? 'none' : 'block'}}>
            <div className='back' onClick={replaceSlide.bind(null, 'right')}>
                <i className="fas fa-chevron-left"></i>
            </div>
            <div className='go' onClick={replaceSlide.bind(null, 'left')}>
                <i className="fas fa-chevron-right"></i>
            </div>
            <h2 className='recommendations__title'>Recommendations</h2>
            <div className='recommendations__body'>
                <div className={slides[0]}>
                    {recommendatedProducts.slice(0,5).map(product => (
                        <Product 
                            key={product._id} 
                            like={like} 
                            addView={addView} 
                            deleteLike={deleteLike} 
                            addInCart={addInCart}
                            product={product} />
                    ))}
                </div>
                <div className={slides[1]}>
                    {recommendatedProducts.slice(4,10).map(product => (
                        <Product 
                            key={product._id} 
                            like={like} 
                            addView={addView} 
                            deleteLike={deleteLike} 
                            addInCart={addInCart}
                            product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

const mapDispatchesToProps: DispatchesToProps = {
    recommendations,
    like: likeProductRec,
    myLikes,
    deleteLike: deleteLikeFromRec,
    addView: addViewInRec,
    addInCart
};

export default connect(
    ({ recommendations }: AppState) => ({ recommendatedProducts : recommendations }),
    mapDispatchesToProps
)(Recommendations);