import React from 'react';

export const Pagination = ({totalCount,pageSize,current,getProducts}) => {
    const countPages = Math.ceil(totalCount / pageSize);
    const pages = [];

    for (let i = 1;i <= countPages; i++) {
        pages.push(i);
    }
    
    return (
        <div className='pagination'>
            <i onClick={() => getProducts(current-1)}  className='fas fa-chevron-left pagination__prev'></i>
            {pages.map((page,index) => (
                 <button key={index} onClick={() => getProducts(page)} className={(current == page) ? 'activePag' : ''}>{page}</button>
            ))}
            <i onClick={() => getProducts(current+1)}  className='fas fa-chevron-right pagination__next'></i>
        </div>
    )
}