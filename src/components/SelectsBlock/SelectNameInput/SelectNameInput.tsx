import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import s from './SelectNameInput.module.css'
import style from '../Select.module.css'
import {useSearchParams} from 'react-router-dom';
import useDebounce from '../../../hooks/AutoDispatch';
import {IAppStore} from '../../../store/store';
import {UrlParamsType} from '../../../store/gallery-reducer';


export const SelectNameInput = () => {
    const urlParams = useSelector<IAppStore, UrlParamsType>(state => state.gallery.urlParams)
    const isNightModeOn = useSelector<IAppStore, boolean>(state => state.gallery.isNightModeOn)

    const [searchParams, setSearchParams] = useSearchParams()
    const [name, setName] = useState('')
    let prevParams = Object.fromEntries(searchParams)

    const inputStyle = isNightModeOn
        ? `${style.selectHeader__current__title} ${s.select__current__input} ${s.select__current__input__nightMode}`
        : `${style.selectHeader__current__title} ${s.select__current__input}`


    // const history = useNavigate()
    const onKeyUpHandler = useDebounce(() => {
        if (name) {
            setSearchParams({...prevParams, q: name})
        } else {
            delete prevParams.q
            setSearchParams({...prevParams})
        }

    }, 1000)
    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            setSearchParams({...prevParams, q: name})
        }
    }
    const setInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    useEffect(() => {
        urlParams.q && setName(urlParams.q)
    }, [urlParams.q])

    return <div className={style.select}>
        <div className={isNightModeOn
            ? `${style.selectHeader} ${style.selectHeader__nightMode}`
            : `${style.selectHeader} ${style.selectHeader__whiteMode}`}>
            <input className={inputStyle}
                   type="text"
                   placeholder={'Name'}
                   value={name}
                   onChange={setInputValueHandler}
                   onKeyUp={onKeyUpHandler}
                   onKeyPress={onEnterPressHandler}
            />
        </div>
    </div>
}



