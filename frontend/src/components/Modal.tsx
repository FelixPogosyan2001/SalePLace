import React,{ useState, MouseEvent } from 'react';
import InputBox from './Inputs/InputBox';
import { ChoiceCatalog } from './Catalog/ChoiceCatalog';
import ProductContain from '../context/product';
import { LinkDispatchToProps } from '../additional/interfaces';

interface ModalProps {
    addProduct: (productData: Info) => void
    deleteModal: (event: MouseEvent<HTMLElement>) => void
}

interface Info {
    title : string
    description : string
    price : string
    avatar: string
    category : string
}

export const Modal: React.FC<ModalProps> = ({ addProduct, deleteModal }) => {
    const [productData,setProductData] = useState<Info>({
        title : '',
        description : '',
        price : '',
        avatar: '',
        category : ''
    });

    const handlerModal = async (): Promise<void> => {
        await addProduct(productData);
        setProductData({
            title : '',
            description : '',
            price : '',
            avatar: '',
            category : ''
        });
    }
   
    return(
        <div className="modal">
            <div className='modal__header'>
                <h1 className='modal__title'>Adding Product</h1>
                <i onClick={deleteModal} className='fas fa-times'/>
            </div>
            <div className='modal__body'>
                {
                    Object.entries(productData).map((item,index) => {
                        if (item[0] == 'category') {
                            return (
                                <ProductContain.Provider value={{data : productData,change : setProductData}}>
                                    <ChoiceCatalog />
                                </ProductContain.Provider>
                            )
                        }
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