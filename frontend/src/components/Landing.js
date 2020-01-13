import React,{useEffect,useRef} from 'react';
import {NavLink} from 'react-router-dom';
import photo from '../images/landingPhoto.jpg';
import publish from '../images/publish.png';
import sale from '../images/sale.png';
import chat from '../images/chat.png';
import recommend from '../images/recommendations.png';
import admin from '../images/admin.png';
import gucci from '../images/gucci.jpg';
import ck from '../images/ck.jpg';
import adidas from '../images/adidas.jpg';
import nike from '../images/nike.jpg';
import dg from '../images/dg.jpg';
import zara from '../images/zara.jpg';
import { Brand } from './Brand';

const Landing = () => {
    const brands = [gucci,ck,adidas,nike,dg,zara]

    useEffect(() => {
        const listener = () => {
            var a = document.getElementsByClassName('landing__photo')[0].clientHeight;
            var b = document.getElementsByClassName('landing__advantages')[0].clientHeight;
            var c = document.getElementsByClassName('landing__details')[0].clientHeight;
            var d = document.getElementsByClassName('landing__brands')[0].clientHeight / 2;
            var scrollTop = (a+b+c+d+150);
        
            if (Math.round(window.pageYOffset) >= scrollTop) {
                var blocks = document.querySelectorAll('.landing__counter > div > span');
                const timer = setInterval(() => {
                   if (!blocks[0].textContent.includes('100') && !blocks[2].textContent.includes('100')) {
                      blocks[0].textContent = String(Number(parseInt(blocks[0].textContent)) + 1) + '%';
                      blocks[2].textContent = String(Number(parseInt(blocks[2].textContent)) + 1) + '%';
                   } if (!blocks[1].textContent.includes('7')) {
                      blocks[1].textContent = String(Number(blocks[1].textContent) + 1);
                   } else if (blocks[0].textContent.includes('100') && 
                              blocks[2].textContent.includes('100') && 
                              blocks[1].textContent.includes('7')) {
                      clearInterval(timer)
                   }
                },50)
            }
        };

        window.addEventListener('scroll',listener);
        return () => window.removeEventListener('scroll',listener)

    });

    return (
        <div className='landing'>
            <section style={{backgroundImage:`url(${photo})`}} className="landing__photo">
                <span>The best way to buy or publish product</span>
                <NavLink to='/products'>Start now</NavLink>
            </section>
            <section className="landing__advantages">
                <span>Our advantages</span>
                <div className="landing__advantages__block">
                    <img src={publish} />
                    <p>You can publish your product that you want to sell as soon as possible. And in the near future you will receive your first response from the buyer</p>
                    <NavLink className='hoverBtnEffect' to='/authentication'><span>Go to profile</span></NavLink>
                </div>
                <div className="landing__advantages__block">
                    <img src={sale} />
                    <p>You can also purchase any product in the catalog of our site. There are many categories, therefore the choice will be great</p>
                    <NavLink className='hoverBtnEffect' to='/products'><span>Go to catalog</span></NavLink>
                </div>
                <div className="landing__advantages__block">
                    <img src={chat} />
                    <p>Each user can communicate with the seller of the product and discuss all the small details and probably get to buy the product at a lower price.</p>
                    <NavLink className='hoverBtnEffect' to='/authentication'><span>Go to chat</span></NavLink>
                </div>
            </section>
            <section className="landing__details">
                <div className="fisrt-side">
                    <img src={recommend} />
                    <p>Favorites directory allows the site to generate products and give them out as recommendations. Thus, all your likes will be taken into account by the store’s algorithms.</p>
                </div>
                <div className="second-side">
                     <img src={admin} />
                     <p>After filling out the form for adding goods, your application will first be moderated and, if approved, will appear on the site.
                        It is worth noting that the request may be moderated for several days.
                     </p>
                </div>
            </section>
            <section className="landing__brands">
                <span>Brands</span>
                {brands.map((brand,i) => <Brand key={i} photo={brand}/>)}
            </section>
            <section className="landing__counter">
                <div>
                    <span>0%</span>
                    <p>Доступность</p>
                </div>
                <div>
                    <span>0</span>
                    <p>Категорий товаров</p>
                </div>
                <div>
                    <span>0%</span>
                    <p>Свобода выбора</p>
                </div>
            </section>
        </div>
    )
}

export default Landing;