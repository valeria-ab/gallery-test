import React, {useState} from 'react';
import s from './Pagination.module.css'
import {PaintingsResponseType} from '../../utils/api';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../store/store';
import {setPage} from '../../store/gallery-reducer';


const Pagination = () => {
    const dispatch = useDispatch()

    const paintings = useSelector<IAppStore, Array<PaintingsResponseType>>(state => state.gallery.paintings)
    const isNightModeOn = useSelector<IAppStore, boolean>(state => state.gallery.isNightModeOn)
    const currentPage = useSelector<IAppStore, number>(state => state.gallery.currentPage)

    const pagesModeStyle = isNightModeOn ? `${s.paginationBlock__pageButton} ${s.pageButton__nightMode}` : `${s.paginationBlock__pageButton} ${s.pageButton__whiteMode}`
    const activePageModeStyle = isNightModeOn ? s.pageButton__nightMode__page__active : s.pageButton__whiteMode__page__active
    const disabledStyle = `${pagesModeStyle} ${s.paginationBlock__pageButton__buttonDisabled}`

    const itemsPerPage = useSelector<IAppStore, number>(state => state.gallery.itemsPerPage)
    const cardPacksTotalCount = paintings.length
    const pagesCount = Math.ceil(cardPacksTotalCount / itemsPerPage) // count of all pages, before pagination
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const portionSize = 3
    const portionCount = Math.ceil(pagesCount / portionSize) // count of page portions
    const [portion, setPortion] = useState(Math.ceil(currentPage / portionSize))
    const leftNumber = (portion - 1) * portionSize + 1
    const rightNumber = portion * portionSize


    const onLeftDoubleQuoteClick = () => {
        setPortion(portion - 1)
        dispatch(setPage({currentPage: leftNumber - 3}))
    }

    const onRightDoubleQuoteClick = () => {
        setPortion(portion + 1)
        dispatch(setPage({currentPage: leftNumber + 3}))
    }

    const onLeftSingleAngleQuoteClick = () => {
        if (currentPage === leftNumber) {
            setPortion(portion - 1)
        }
        dispatch(setPage({currentPage: currentPage - 1}))
    }

    const onRightSingleAngleQuoteClick = () => {
        if (currentPage === rightNumber) {
            setPortion(portion + 1)
        }
        dispatch(setPage({currentPage: currentPage + 1}))
    }


    return (
        <div className={isNightModeOn
            ? `${s.paginationBlock} ${s.paginationBlock__nightMode}`
            : `${s.paginationBlock} ${s.paginationBlock__whiteMode}`
        }>
            <button className={currentPage === 1 || portion == 1 ? disabledStyle : pagesModeStyle}
                    style={{borderRadius: '8px 0 0 8px', fontSize: '23px'}}
                    disabled={portion === 1}
                    onClick={onLeftDoubleQuoteClick}
            >
                &laquo;
            </button>
            <button className={currentPage === 1 ? disabledStyle : pagesModeStyle}
                    style={{borderLeft: '1px', fontSize: '23px'}}
                    disabled={currentPage === 1}
                    onClick={onLeftSingleAngleQuoteClick}
            >
                &#8249;
            </button>
            {pages.filter(p => p ? p >= leftNumber && p <= rightNumber : '')
                .map(item => {
                    return <button key={item}
                                   style={{fontWeight: 'bold'}}
                                   className={currentPage === item ? `${pagesModeStyle} ${activePageModeStyle}` : pagesModeStyle}
                                   onClick={() => {
                                       dispatch(setPage({currentPage: item}))
                                   }}
                    >{item}</button>
                })}
            <button className={currentPage === pages.length ? disabledStyle : pagesModeStyle}
                    style={{fontSize: '23px'}}
                    disabled={currentPage === pages.length}
                    onClick={onRightSingleAngleQuoteClick}>
                &#8250;
            </button>
            <button
                className={portion === portionCount ? disabledStyle : pagesModeStyle}
                style={{
                    borderRadius: '0 8px 8px 0',
                    border: 'none',
                    fontSize: '23px',
                }}
                disabled={portion === portionCount}
                onClick={onRightDoubleQuoteClick}
            >&raquo;</button>
        </div>
    );
}

export default Pagination;
