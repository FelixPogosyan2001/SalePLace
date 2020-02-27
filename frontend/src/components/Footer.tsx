import React from 'react';
import { NavLink } from 'react-router-dom';

export const Footer: React.FC<{ token: string }> = ({ token }) => (
    <footer style={token && { height: '20vh' }}>
        {!token && <section className='reg'>
            <NavLink to={{ pathname: '/authentication', state: 'signUp' }}>
                <button>Sign Up</button>
            </NavLink>
        </section>}
        <section style={token && { top: '-28px' }} className='social-media'>
            <div className='social-media__facebook'>
                <i className="fab fa-facebook-f"></i>
            </div>
            <div className='social-media__inst'>
                <i className="fab fa-instagram"></i>
            </div>
            <div className='social-media__vk'>
                <i className="fab fa-vk"></i>
            </div>
            <div className='social-media__dribble'>
                <i className="fas fa-basketball-ball"></i>
            </div>
        </section>
        <section className='copyright'>
            <p><span>&copy; 2020 Copyright</span>: SalePlace.com</p>
        </section>
    </footer>
)