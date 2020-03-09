import React,{ useState, useRef, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import MessageForm from './Dialogs/MessageForm';
import { Product } from '../additional/interfaces';

type Props = Product & { close: (arg: boolean) => void };

const MoreInfo: React.FC<Props> = (props) => {
    const [messageModal,setMessageModal] = useState<boolean>(false);
    const zoomTool = useRef<HTMLDivElement>(null);
    const zoomContent = useRef<HTMLDivElement>(null);
    const stick = useRef<HTMLSpanElement>(null);

    const zoomIn = (): void => {
        zoomContent.current.style.backgroundImage = `url(http://localhost:2001/${props.image})`;
        zoomTool.current.style.display = 'block';
        stick.current.style.display = 'block';
    }

    const zoomOut = (): void => { 
        zoomTool.current.style.display = 'none';
        stick.current.style.display = 'none';
    }

    const zoomMove = (e: MouseEvent<HTMLDivElement>): void => {
        let x = e.clientX - 25;
        let y = e.clientY - 64;
        
        zoomContent.current.style.transform = `translate(-${x - 75}px, -${y - 30}px)`;
        zoomTool.current.style.left = `${x - 75}px`;
        zoomTool.current.style.top = `${y - 30}px`;
        stick.current.style.left = `${x - 75}px`;
        stick.current.style.top = `${y - 30}px`;
    }

    return(
        <div className='moreInfo'>
            <div className='moreInfo__photo' onMouseOut={zoomOut} onMouseMove={zoomMove} onMouseOver={zoomIn} style={{backgroundImage : `url(http://localhost:2001/${props.image})`}}>
                <div className='zoom-container'>
                    <div ref={zoomTool} className='zoom'>
                        <div ref={zoomContent} className='zoom__content'></div>
                    </div>
                    <span className='stick' ref={stick}></span>
                </div>
            </div>
            <div className='moreInfo__body'>
                <h1>{props.title}</h1>
                <p>{props.description}</p>
                <span>{props.price} $</span>
                <div>
                    <div style={{backgroundImage:`url(http://localhost:2001/${props.creator.avatar})`}} /> 
                    <b>{props.creator.name + ' ' + props.creator.lastname}</b>
                </div>
                {localStorage.getItem('token') && <button onClick={() => setMessageModal(true)}>Write to seller</button>}
            </div>
            <i className="moreInfo__delete fas fa-times" onClick={props.close.bind(null, false)} />
            {messageModal && createPortal(<MessageForm close={setMessageModal} receiver={props.creator} />, document.body)}
        </div>
    )
}

export default MoreInfo;
