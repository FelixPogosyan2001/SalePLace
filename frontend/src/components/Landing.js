import React from 'react';
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

    return (
        <div className='landing'>
            <section style={{backgroundImage:`url(${photo})`}} className="landing__photo">
                <span>The best way to buy or publish product</span>
                <button>Start now</button>
            </section>
            <section className="landing__advantages">
                <span>Our advantages</span>
                <div className="landing__advantages__block">
                    <img src={publish} />
                    <p>You can publish your product that you want to sell as soon as possible. And in the near future you will receive your first response from the buyer</p>
                    <button>Go to profile</button>
                </div>
                <div className="landing__advantages__block">
                    <img src={sale} />
                    <p>You can also purchase any product in the catalog of our site. There are many categories, therefore the choice will be great</p>
                    <button>Go to catalog</button>
                </div>
                <div className="landing__advantages__block">
                    <img src={chat} />
                    <p>Each user can communicate with the seller of the product and discuss all the small details and probably get to buy the product at a lower price.</p>
                    <button>Go to chat</button>
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
                    <span>100%</span>
                    <p>Доступность</p>
                </div>
                <div>
                    <span>100%</span>
                    <p>Свобода выбора</p>
                </div>
                <div>
                    <span>7</span>
                    <p>Категорий товаров</p>
                </div>
            </section>
        </div>
    )
}

export default Landing;