import React, {useState} from 'react';

import {PaintingsResponseType} from '../utils/api';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../redux/store';
import {setPage} from '../redux/gallery-reducer';


const Pagination = () => {
    const currentPage = useSelector<IAppStore, number>(state => state.gallery.currentPage)
    const paintings = useSelector<IAppStore, Array<PaintingsResponseType>>(state => state.gallery.paintings)
    const dispatch = useDispatch()
    const pageCount = 12;
    const cardPacksTotalCount = paintings.length
    const pagesCount = Math.ceil(cardPacksTotalCount / pageCount)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }


    return (
        <div style={{border: '1px solid', margin: '10px', padding: '5px'}}>
            {pages.map((item) => {
                return <span key={item}
                             style={{display: 'inline-block',
                                 border: '1px solid',
                                 margin: '10px',
                                 padding: '5px',
                                 backgroundColor: currentPage=== item ? "gold" : "",

                }}
                             onClick={() => {
                                 dispatch(setPage({currentPage: item}))
                             }}
                >{item}</span>
            })}
        </div>
    );
}

export default Pagination;
