import React,{ useState, MouseEvent, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import SearchInput from './Search/SearchInput';
import { AppProps } from '../additional/interfaces';

export const Header: React.FC<AppProps> = (props) => {
    const [searchInput,setSearchInput] = useState<boolean>(false);
    const smoke = useRef<HTMLVideoElement>(null);
    const title = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        setTimeout(() => title.current.style.opacity = '1', 3400);
        setTimeout(() => {
            title.current.style.color = '#242939';
            smoke.current.style.opacity = '0';
        }, 5500);
    },[])

    const handlerMenu = (): void => {
        document.getElementById("root").classList.toggle('open')
    }

    return (
        <header className="app-header">
            <menu type="list">
                <li><NavLink exact activeClassName="activeLink" className="list__item" to="/">Main</NavLink></li>
                <li><NavLink activeClassName="activeLink" className="list__item" to="/products">Products</NavLink></li>
                <li><NavLink activeClassName="activeLink" className="list__item" to="/authentication">Private office</NavLink></li>
            </menu>
            <button onClick={handlerMenu} className="app-header__button">
              <span></span>
            </button>
            <section className='app-header__title'>
                <video ref={smoke} src={require('../smoke.mp4')} autoPlay muted />
                <h2 ref={title}>
                    <span>S</span>
                    <span>a</span>
                    <span>l</span>
                    <span>e</span>
                    <span>P</span>
                    <span>l</span>
                    <span>a</span>
                    <span>c</span>
                    <span>e</span>
                </h2>
            </section> 
            {searchInput && <SearchInput /> }
            {searchInput ? <i className="fas fa-times" onClick={() => setSearchInput(false)} />: <i onClick={() => setSearchInput(true)} className={`fas fa-search ${props.token ? 'changeLocal' : ''}`}></i>}
            {props.token && <NavLink to = "/favorites"><i className='far fa-heart' /></NavLink>}
            <NavLink to = "/cart"><i className="fas fa-shopping-cart"/></NavLink>
            <i onClick={props.logout} className="fas fa-sign-out-alt"></i>
        </header>   
    )
}