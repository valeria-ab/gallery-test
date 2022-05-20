import React, {useState} from 'react';

import {PaintingsResponseType} from '../../utils/api';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../store/store';
import {setPage} from '../../store/gallery-reducer';


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
        <div style={{border: '1px solid', padding: '5px',  height: "10vh"}}>
            <button disabled={currentPage === 1}
                    onClick={() => dispatch(setPage({currentPage: currentPage - 1}))}
            >&lt;</button>
            {pages.map((item) => {
                return <span key={item}
                             style={{
                                 display: 'inline-block',
                                 border: '1px solid',
                                 margin: '10px',
                                 padding: '5px',
                                 backgroundColor: currentPage === item ? 'black' : '',
                                 color: currentPage === item ? 'white' : 'black',

                             }}
                             onClick={() => {
                                 dispatch(setPage({currentPage: item}))
                             }}
                >{item}</span>
            })}
            <button disabled={currentPage === pages.length}
                    onClick={() => dispatch(setPage({currentPage: currentPage + 1}))}
            >&gt;</button>

        </div>
    );
}

export default Pagination;
