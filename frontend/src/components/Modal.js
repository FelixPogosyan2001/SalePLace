import React,{useState,Fragment} from 'react';
import InputBox from './Inputs/InputBox';

export const Modal = ({addProduct,deleteModal}) => {
    const [productData,setProductData] = useState({
        title : '',
        description : '',
        price : '',
        avatar: '',
        category : ''
    });

    const handlerModal = async () => {
        await addProduct(productData);
    }

    return(
        <div className="modal">
            <h1 className='modal__title'>Adding Product</h1>
            <i onClick={deleteModal}>X</i>
            <div className='modal__body'>
                {
                    Object.entries(productData).map((item,index) => {
                        return (
                            <InputBox 
                                key={index}
                                id={item[0]}
                                type={item[0]=='avatar' ? 'file' : 'text'}
                                data={productData}
                                change={setProductData}
                            />
                        )
                    })
                }
            </div>
            <div className="modal__footer">
                <button onClick={handlerModal}>Add</button>
            </div>
        </div>
    )
}