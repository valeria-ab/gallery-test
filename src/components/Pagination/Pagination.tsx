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
    const disabledStyle = isNightModeOn
        ? `${pagesModeStyle} ${s.paginationBlock__pageButton__buttonDisabled__nightMode}`
        : `${pagesModeStyle} ${s.paginationBlock__pageButton__buttonDisabled__whiteMode}`

    const itemsPerPage = useSelector<IAppStore, number>(state => state.gallery.itemsPerPage)
    const cardPacksTotalCount = paintings.length
    const pagesCount = Math.ceil(cardPacksTotalCount / itemsPerPage) // count of all pages, before pagination
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const portionSize = 3 //count of pages
    const [leftNumber, setLeftNumber] = useState(1)
    const [rightNumber, setRightNumber] = useState(portionSize)


    const onLeftDoubleQuoteClick = () => {
        setLeftNumber(1)
        setRightNumber(portionSize)
        dispatch(setPage({currentPage: 1}))
    }

    const onRightDoubleQuoteClick = () => {
        setLeftNumber(pages.length - (portionSize - 1))
        setRightNumber(pages.length)
        dispatch(setPage({currentPage: pages.length}))
    }

    const onLeftSingleAngleQuoteClick = () => {
        if (currentPage === leftNumber) {
            setRightNumber(rightNumber - 1)
            setLeftNumber(leftNumber - 1)
        }
        dispatch(setPage({currentPage: currentPage - 1}))
    }

    const onRightSingleAngleQuoteClick = () => {
        if (currentPage === rightNumber) {
            setRightNumber(rightNumber + 1)
            setLeftNumber(leftNumber + 1)
        }
        dispatch(setPage({currentPage: currentPage + 1}))
    }


    return (
        <div className={s.paginationBlock}>
            <button className={currentPage === 1 ? disabledStyle : pagesModeStyle}
                    style={{borderRadius: '8px 0 0 8px', fontSize: '23px'}}
                    disabled={currentPage === 1}
                    onClick={onLeftDoubleQuoteClick}
            >
                &laquo;
            </button>
            <button className={currentPage === 1 ? disabledStyle : pagesModeStyle}
                    style={{fontSize: '23px'}}
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
                className={currentPage === pages.length ? disabledStyle : pagesModeStyle}
                style={{
                    borderRadius: '0 8px 8px 0',
                    fontSize: '23px',
                }}
                disabled={currentPage === pages.length}
                onClick={onRightDoubleQuoteClick}
            >&raquo;</button>
        </div>
    );
}

export default Pagination;
