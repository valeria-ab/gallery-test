import React, {useEffect, useState} from 'react';
import {AuthorsResponseType, LocationsResponseType} from '../../../utils/api';
import {useSelector} from 'react-redux';
import s from './SelectWithOptions.module.css';
import style from '../Select.module.css';
import {useSearchParams} from 'react-router-dom';
import {IAppStore} from '../../../store/store';
import {UrlParamsType} from '../../../store/gallery-reducer';


type SelectPropsType = {
    title: string
    locations?: Array<LocationsResponseType>
    authors?: Array<AuthorsResponseType>
}
export const SelectWithOptions = (props: SelectPropsType) => {
    const isNightModeOn = useSelector<IAppStore, boolean>(state => state.gallery.isNightModeOn)
    const urlParams = useSelector<IAppStore, UrlParamsType>(state => state.gallery.urlParams)

    const [searchParams, setSearchParams] = useSearchParams()
    let prevParams = Object.fromEntries(searchParams)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const [crossIconStyle, setIconCrossIconStyle] = useState({display: 'none'})

    //styles
    const headerNightModeOpenStyle = `${style.selectHeader} ${style.selectHeader__header__open__nightMode}`
    const headerWhiteModeOpenStyle = `${style.selectHeader} ${style.selectHeader__header__open__whiteMode}`
    const headerOpenStyle = isNightModeOn ? headerNightModeOpenStyle : headerWhiteModeOpenStyle
    const headerClosedStyle = isNightModeOn
        ? `${style.selectHeader} ${style.selectHeader__nightMode}`
        : `${style.selectHeader} ${style.selectHeader__whiteMode}`


    const onCrossIconClick = (e: any) => {
        e.stopPropagation()
        props.authors && delete prevParams.authorId
        props.locations && delete prevParams.locationId
        setTitle(props.title)
        setIconCrossIconStyle({display: 'none'})
        setSearchParams({...prevParams})
    }
    const onAuthorsOptionClick = (id: number) => {
        setSearchParams({
            ...prevParams,
            authorId: id.toString()
        })
        setIsOpen(false)
        setIconCrossIconStyle({display: 'block'})
    }
    const onLocationsOptionClick = (id: number) => {
        setSearchParams({
            ...prevParams,
            locationId: id.toString()
        })
        setIsOpen(false)
        setIconCrossIconStyle({display: 'block'})
    }


    useEffect(() => {
        if (props.authors && urlParams.authorId) {
            const author = props.authors.find(a => a.id.toString() === urlParams.authorId)
            author && author.name !== title && setTitle(author.name)
            setIconCrossIconStyle({display: 'block'})
        }

        if (props.locations && urlParams.locationId) {
            const location = props.locations.find(a => a.id.toString() === urlParams.locationId)
            location && location.location !== title && setTitle(location.location)
            setIconCrossIconStyle({display: 'block'})
        }

    }, [urlParams.authorId, urlParams.locationId, props.authors, props.locations])


    return <div className={isOpen ? `${style.select} ${style.is__active}` : style.select}
                onClick={() => setIsOpen(!isOpen)}
                tabIndex={2}
                onBlur={() => setIsOpen(false)}

    >
        <div className={isOpen ? headerOpenStyle : headerClosedStyle}
        >
            <span className={style.selectHeader__current__title}>{title}</span>
            <div className={style.selectHeader__iconsContainer}>
                <div className={style.select__icon}
                     style={crossIconStyle}
                     onClick={onCrossIconClick}
                >&times;</div>
                <div className={style.select__icon}
                     onClick={() => setIsOpen(!isOpen)}
                >&#9660;</div>

            </div>
        </div>
        <div className={isNightModeOn
            ? `${style.selectBody} ${style.selectBody__nightMode}`
            : `${style.selectBody} ${style.selectBody__whiteMode}`
        }>
            {
                props.authors && props.authors.map(option => <div key={option.id}
                                                                  className={isNightModeOn
                                                                      ? `${s.select__item} ${s.select__item__nightMode}`
                                                                      : `${s.select__item} ${s.select__item__whiteMode}`}
                                                                  onClick={() => onAuthorsOptionClick(option.id)}
                    >
                        {option.name}
                    </div>
                )}

            {
                props.locations && props.locations.map(option => <div key={option.id}
                                                                      className={isNightModeOn
                                                                          ? `${s.select__item} ${s.select__item__nightMode}`
                                                                          : `${s.select__item} ${s.select__item__whiteMode}`}
                                                                      onClick={() => onLocationsOptionClick(option.id)}
                    >
                        {option.location}
                    </div>
                )}
        </div>

    </div>
}





