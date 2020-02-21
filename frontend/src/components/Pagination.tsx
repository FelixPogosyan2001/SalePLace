import React from 'react';

interface PagProps {
    totalCount: number
    pageSize: number
    current: number
    getProducts: Function
}

export const Pagination: React.FC<PagProps> = ({ totalCount, pageSize, current, getProducts }) => {
    const countPages: number = Math.ceil(totalCount / pageSize);
    const pages: Array<number> = [];

    for (let i = 1; i <= countPages; i++) {
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