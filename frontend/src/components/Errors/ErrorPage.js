import React from 'react';
import ImageError from '../../images/404.png';

export const ErrorPage = () => {
    return (
        <div className='error-page'>
            <img src={ImageError} className='error-page__image' />
        </div>
    )
}