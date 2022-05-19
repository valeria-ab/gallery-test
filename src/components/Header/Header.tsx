import {useState} from 'react';
import style from './Header.module.css'
import {setIsNightModeOn} from '../redux/gallery-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../redux/store';

export const Header = () => {
    const dispatch = useDispatch()
    const isNightModeOn = useSelector<IAppStore, boolean>(state => state.gallery.isNightModeOn)

    return <header className={style.header}>
        <button onClick={() => dispatch(setIsNightModeOn({isNightModeOn: !isNightModeOn}))}>night mode</button>
    </header>
}