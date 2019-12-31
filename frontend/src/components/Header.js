import React,{useState} from 'react';
import {NavLink} from 'react-router-dom';
import SearchInput from './Search/SearchInput';

export const Header = (props) => {
    const [searchInput,setSearchInput] = useState(false);

    const handlerMenu = () => {
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
            <h2 className="app-header__title">SalePlace</h2>
            {searchInput && <SearchInput /> }
            {searchInput ? <i className="fas fa-times" onClick={() => setSearchInput(false)} />: <i onClick={() => setSearchInput(true)} className={`fas fa-search ${props.token ? 'changeLocal' : ''}`}></i>}
            {props.token && <NavLink to = "/favorites"><i className='fas fa-heart' /></NavLink>}
            <NavLink to = "/cart"><i className="fas fa-shopping-cart"/></NavLink>
            <i onClick={props.logout} className="fas fa-sign-out-alt"></i>
        </header>   
    )
}