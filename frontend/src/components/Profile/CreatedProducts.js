import React,{useState,useEffect} from 'react';
import {createPortal} from 'react-dom';
import Aside from '../Aside';
import {Modal} from '../Modal';
import {connect} from 'react-redux';
import {myProducts,myLikes,addProduct,likeProduct,deleteLike,addView} from '../../redux/actions/products';
import {addInCart} from '../../redux/actions/cart';
import Product from '../Products/Product';

const CreatedProducts = ({myProducts,myLikes,products,addProduct,like,deleteLike,addView,addInCart}) => {
    const [isOpenModal,setModal] = useState(false);
    const handlerModal = () => {
        let div = document.createElement('div');
        div.className = 'shadowBox';
        document.body.prepend(div);
        document.body.style = 'overflow:hidden';
        setModal(!isOpenModal);
    }

    useEffect(() => {
        myProducts();
        myLikes();
    },[]);

    const deleteModal = () => {
        let block = document.getElementsByClassName('shadowBox')[0];
        block.parentNode.removeChild(block)
        setModal(false);
    }
  
    return (
        <div className="createdProducts">
            <Aside/>
            <main>
                {products.map((product,index) => (
                    <Product 
                         like={like} 
                         addView={addView} 
                         deleteLike={deleteLike} 
                         isMy={true} 
                         key={index} 
                         addInCart={addInCart}
                         product={product} />
                ))}
            </main>
            <section>
                <button onClick={handlerModal}>Add product</button>
            </section>
            {isOpenModal && createPortal(<Modal deleteModal={deleteModal} addProduct={addProduct} />,document.getElementsByClassName('shadowBox')[0])}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products : state.profile.createdProducts
    }
};

const mapDispatchesToProps = {
    myProducts,
    addProduct,
    like : likeProduct,
    myLikes,
    deleteLike,
    addView,
    addInCart
};

export default connect(mapStateToProps,mapDispatchesToProps)(CreatedProducts);