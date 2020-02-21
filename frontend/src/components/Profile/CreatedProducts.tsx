import React,{ useState, useEffect ,Fragment } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '../Modal';
import { connect } from 'react-redux';
import { addInCart } from '../../redux/actions/cart';
import { AppState } from '../../redux/reducers';
import { Dispatches, Product as Element } from '../../additional/interfaces';
import Aside from '../Aside'
import Product from '../Products/Product';
import Recommendations from '../Recommendations';
import { 
    myProducts,
    myLikes, 
    addProduct, 
    likeProduct, 
    deleteLike, 
    addView 
} from '../../redux/actions/products';

interface LinkDispatchesToProps extends Dispatches {
    myProducts: () => void
    addProduct: (data: object) => void
}

interface LinkStateToProps {
    products: Array<Element>
}


type CPProps = LinkDispatchesToProps & LinkStateToProps

const CreatedProducts: React.FC<CPProps> = ({
    myProducts,
    myLikes,
    products,
    addProduct,
    like,
    deleteLike,
    addView,
    addInCart
}) => {
    const [isOpenModal,setModal] = useState(false);

    useEffect(() => {
        myProducts();
        myLikes();
    },[]);

    const handlerModal = (): void => {
        let div = document.createElement('div');
        div.className = 'shadowBox';
        document.body.prepend(div);
        document.body.style.overflow = 'hidden';
        setModal(!isOpenModal);
    }

    const deleteModal = (): void => {
        let block = document.getElementsByClassName('shadowBox')[0];
        block.parentNode.removeChild(block);
        getComputedStyle(document.body).overflow = 'auto';
        setModal(false);
    }
  
    return (
        <Fragment>
            <div className="createdProducts">
                <Aside/>
                <main>
                    {products.map((product,index) => (
                        <Product 
                             like={like} 
                             addView={addView} 
                             deleteLike={deleteLike} 
                             key={index} 
                             addInCart={addInCart}
                             product={product} />
                    ))}
                </main>
                <section className='addProduct'>
                    <button onClick={handlerModal}>Add product</button>
                </section>
                {isOpenModal && createPortal(<Modal deleteModal={deleteModal} addProduct={addProduct} />,document.getElementsByClassName('shadowBox')[0])}
            </div>
            <Recommendations />
        </Fragment>
    )
}

const mapStateToProps = ({ products }: AppState): LinkStateToProps => ({
    products : products.data
});

const mapDispatchesToProps: LinkDispatchesToProps = {
    myProducts,
    addProduct,
    like : likeProduct,
    myLikes,
    deleteLike,
    addView,
    addInCart
};

export default connect(mapStateToProps,mapDispatchesToProps)(CreatedProducts);