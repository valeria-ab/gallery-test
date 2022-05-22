import s from './Header.module.css'
import {setIsNightModeOn} from '../../store/gallery-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../store/store';

export const Header = () => {
    const dispatch = useDispatch()
    const isNightModeOn = useSelector<IAppStore, boolean>(state => state.gallery.isNightModeOn)

    return <header className={s.header}>
        <div
            onClick={() => dispatch(setIsNightModeOn({isNightModeOn: !isNightModeOn}))}
        >
            <span className={isNightModeOn
                ? `${s.header__icon} ${s.header__icon__nightMode}`
                : s.header__icon}
            >
                ☀
            </span>
        </div>
    </header>
}