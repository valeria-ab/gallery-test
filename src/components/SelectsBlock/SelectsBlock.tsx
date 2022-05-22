import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AuthorsResponseType, LocationsResponseType} from '../../utils/api';
import {useSelector} from 'react-redux';
import s from './Select.module.css'
import {useNavigate, useSearchParams} from 'react-router-dom';
import useDebounce from '../../hooks/AutoDispatch';
import {IAppStore} from '../../store/store';

const SelectsBlock = React.memo(() => {

        const authors = useSelector<IAppStore, Array<AuthorsResponseType>>(state => state.gallery.authors)
        const locations = useSelector<IAppStore, Array<LocationsResponseType>>(state => state.gallery.locations)


        return (
            <div className={s.selects__Block}>
                <SelectsBlockNameInput />
                <SelectItem title={'Author'} authors={authors} />
                <SelectItem title={'Location'} locations={locations}/>
                <SelectWithDate />
            </div>
        );
    }
)
export default SelectsBlock;

type SelectPropsType = {
    title: string
    locations?: Array<LocationsResponseType>
    authors?: Array<AuthorsResponseType>
}
const SelectItem = (props: SelectPropsType) => {
    const isNightModeOn = useSelector<IAppStore, boolean>(state => state.gallery.isNightModeOn)
    const [searchParams, setSearchParams] = useSearchParams()
    let prevParams = Object.fromEntries(searchParams)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const [crossIconStyle, setIconCrossIconStyle] = useState({display: 'none'})

    return <div className={isOpen ? `${s.select} ${s.is__active}` : s.select}>
        <div className={isNightModeOn
            ? `${s.selectHeader} ${s.selectHeader__nightMode}`
            : `${s.selectHeader} ${s.selectHeader__whiteMode}`}
        >
            <span className={s.select__current}>{title}</span>
            <div style={{display: 'flex', alignItems: 'center', paddingRight: '10px'}}>
                <div className={s.select__icon}
                     style={crossIconStyle}
                     onClick={() => {
                         props.authors && delete prevParams.authorId
                         props.locations && delete prevParams.id
                         setTitle(props.title)
                         setIconCrossIconStyle({display: 'none'})

                         setSearchParams({...prevParams})
                     }}
                >&times;</div>
                <div className={s.select__icon}
                     onClick={() => setIsOpen(!isOpen)}
                >&#9660;</div>

            </div>
        </div>
        <div className={s.selectBody}>
            {
                props.authors && props.authors.map(option => <div key={option.id}
                                                                  className={isNightModeOn
                                                                      ? `${s.select__item} ${s.select__item__nightMode}`
                                                                      : `${s.select__item} ${s.select__item__whiteMode}`}
                                                                  onClick={() => {
                                                                      setSearchParams({...prevParams, authorId: option.id.toString()})
                                                                      setTitle(option.name)
                                                                      setIsOpen(false)
                                                                      setIconCrossIconStyle({display: 'block'})
                                                                  }}
                    >
                        {option.name}
                    </div>
                )}

            {
                props.locations && props.locations.map(option => <div key={option.id}
                                                                      className={isNightModeOn
                                                                          ? `${s.select__item} ${s.select__item__nightMode}`
                                                                          : `${s.select__item} ${s.select__item__whiteMode}`}
                                                                      onClick={() => {
                                                                          // history({pathname: `/id=${option.id}`})
                                                                          setSearchParams({...prevParams, id: option.id.toString()})

                                                                          setTitle(option.location)
                                                                          setIsOpen(false)
                                                                          setIconCrossIconStyle({display: 'block'})
                                                                      }}
                    >
                        {option.location}
                    </div>
                )}
        </div>

    </div>
}

const SelectsBlockNameInput = () => {
    const isNightModeOn = useSelector<IAppStore, boolean>(state => state.gallery.isNightModeOn)
    const inputStyle = isNightModeOn
        ? `${s.select__current} ${s.select__current__input} ${s.select__current__input__nightMode}`
        : `${s.select__current} ${s.select__current__input}`

    const [searchParams, setSearchParams] = useSearchParams()
    let prevParams = Object.fromEntries(searchParams)
    const [name, setName] = useState('')
    const history = useNavigate()
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
            history({pathname: `/q=${name}`})
        }
    }
    const setInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    return <div className={s.select}>
        <div className={isNightModeOn
            ? `${s.selectHeader} ${s.selectHeader__nightMode}`
            : `${s.selectHeader} ${s.selectHeader__whiteMode}`}>
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


const SelectWithDate = () => {
    const [from, setFrom] = useState<string >('')
    const [before, setBefore] = useState<string >('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const history = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    let prevParams = Object.fromEntries(searchParams)
    const headerStyle = isOpen ? s.selectHeader__test : s.selectHeader
    const isNightModeOn = useSelector<IAppStore, boolean>(state => state.gallery.isNightModeOn)
    const [title, setTitle] = useState<string>('Created')
    const [crossIconStyle, setIconCrossIconStyle] = useState({display: 'none'})


    const onKeyUpHandler = useDebounce(() => {
        if (from && before) {
           setSearchParams({...prevParams, created_gte: from, created_lte: before})
            setIconCrossIconStyle({display: 'block'})
            setTitle(`${from} - ${before}`)
            setIsOpen(false)
        } else {
            history({pathname: `/`})
        }

    }, 1000)

    return <div className={isOpen ? `${s.select} ${s.is__active}` : s.select}>
        <div className={
            isNightModeOn
                ? `${headerStyle} ${s.selectHeader__nightMode}`
                : `${headerStyle} ${s.selectHeader__whiteMode}`}

        >
            <span className={s.select__current}>{title}</span>
            <div style={{display: 'flex', alignItems: 'center', paddingRight: '10px'}}>
            <div className={s.select__icon}
                 style={crossIconStyle}
                 onClick={() => {
                     delete prevParams.created_gte
                     delete prevParams.created_lte
                     setTitle('Created')
                     setSearchParams({...prevParams})
                     setIconCrossIconStyle({display: 'none'})
                     setFrom('')
                     setBefore('')
                     setIsOpen(false)
                 }}
            >&times;</div>
            <div className={`${s.select__icon} ${s.select__icon__arrow}`}
                 onClick={() => {
                    if (from && before) {setTitle(`${from} - ${before}`)}
                     setIsOpen(!isOpen)
                 }}
            >&#9660;</div>
            </div>
        </div>

        <div className={`${s.selectBody} ${s.SelectWithDate__selectBody}`}>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                margin: '20px',
                alignItems: 'center',
                justifyContent: 'space-around'
            }}>
                <input type="number"
                       className={s.created__year__field}
                       placeholder={'from'}
                       value={from}
                       onChange={(e) => {
                           setFrom(e.currentTarget.value)
                       }}
                       onKeyUp={onKeyUpHandler}
                />
                <div style={{textAlign: 'center', marginLeft: "3px", marginRight: "3px"}}>-</div>
                <input type="number"
                       className={s.created__year__field}
                       placeholder={'before'}
                       value={before}
                       onChange={(e) => {
                           setBefore(e.currentTarget.value)
                       }}
                       onKeyUp={onKeyUpHandler}
                />

            </div>
        </div>
    </div>

}
