import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import style from '../Select.module.css'
import s from './SelectWithDate.module.css'
import {useSearchParams} from 'react-router-dom';
import useDebounce from '../../../hooks/AutoDispatch';
import {IAppStore} from '../../../store/store';
import {UrlParamsType} from '../../../store/gallery-reducer';


export const SelectWithDate = () => {
    const urlParams = useSelector<IAppStore, UrlParamsType>(state => state.gallery.urlParams)
    const isNightModeOn = useSelector<IAppStore, boolean>(state => state.gallery.isNightModeOn)

    const [from, setFrom] = useState<string>('')
    const [before, setBefore] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [title, setTitle] = useState<string>('Created')
    const [crossIconStyle, setIconCrossIconStyle] = useState({display: 'none'})
    let prevParams = Object.fromEntries(searchParams)


    //styles
    const headerNightModeOpenStyle = `${style.selectHeader} ${style.selectHeader__header__open__nightMode}`
    const headerWhiteModeOpenStyle = `${style.selectHeader} ${style.selectHeader__header__open__whiteMode}`
    const headerOpenStyle = isNightModeOn ? headerNightModeOpenStyle : headerWhiteModeOpenStyle
    const headerClosedStyle = isNightModeOn
        ? `${style.selectHeader} ${style.selectHeader__nightMode}`
        : `${style.selectHeader} ${style.selectHeader__whiteMode}`


    const onKeyUpHandler = useDebounce(() => {
        if (from && before) {
            setSearchParams({...prevParams, created_gte: from, created_lte: before})
            setIconCrossIconStyle({display: 'block'})
            setIsOpen(false)
        }
    }, 1000)

    const onCrossIconClick = () => {
        delete prevParams.created_gte
        delete prevParams.created_lte
        setTitle('Created')
        setSearchParams({...prevParams})
        setIconCrossIconStyle({display: 'none'})
        setFrom('')
        setBefore('')
        setIsOpen(false)
    }
    const onArrowClick = () => {
        if (from && before) {
            setTitle(`${from} - ${before}`)
        }
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if (urlParams.created_gte && urlParams.created_lte) {
            setTitle(`${urlParams.created_gte} - ${urlParams.created_lte}`)
            setIconCrossIconStyle({display: 'block'})
        }
    }, [urlParams.created_gte, urlParams.created_lte])


    return <div className={isOpen ? `${style.select} ${style.is__active}` : style.select}>
        <div className={isOpen ? headerOpenStyle : headerClosedStyle}>
            <span className={style.selectHeader__current__title}>{title}</span>
            <div className={style.selectHeader__iconsContainer}>
                <div
                    className={style.select__icon}
                    style={crossIconStyle}
                    onClick={onCrossIconClick}
                >&times;</div>
                <div className={`${style.select__icon} ${style.select__icon__arrow}`}
                     onClick={onArrowClick}
                >&#9660;</div>
            </div>
        </div>

        <div className={isNightModeOn
            ? `${style.selectBody} ${s.SelectWithDate__selectBody} ${style.selectBody__nightMode}`
            : `${style.selectBody} ${s.SelectWithDate__selectBody} ${style.selectBody__whiteMode}`}>
            <div className={s.SelectWithDate__fieldsContainer}>
                <input type="number"
                       className={s.created__year__field}
                       placeholder={'from'}
                       value={from}
                       onChange={(e) => setFrom(e.currentTarget.value)}
                       onKeyUp={onKeyUpHandler}
                />
                <span className={isNightModeOn
                    ? `${s.SelectWithDate__selectBody__dash} ${s.SelectWithDate__selectBody__dash__nightMode}`
                    : s.SelectWithDate__selectBody__dash
                }>&#8212;
                </span>
                <input type="number"
                       className={s.created__year__field}
                       placeholder={'before'}
                       value={before}
                       onChange={(e) => setBefore(e.currentTarget.value)}
                       onKeyUp={onKeyUpHandler}
                />

            </div>
        </div>
    </div>

}
