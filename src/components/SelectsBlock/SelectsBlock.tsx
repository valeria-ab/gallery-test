import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import {AuthorsResponseType, cardsApi, LocationsResponseType} from '../../utils/api';
import {useDispatch, useSelector} from 'react-redux';
import {getCardsTC, setAuthors, setLocations} from '../../store/gallery-reducer';
import s from './Select.module.css'
import {useNavigate} from 'react-router-dom';
import useDebounce from '../../hooks/AutoDispatch';
import {IAppStore} from '../../store/store';

const SelectsBlock = React.memo(() => {

    const authors = useSelector<IAppStore, Array<AuthorsResponseType>>(state => state.gallery.authors)
    const locations = useSelector<IAppStore, Array<LocationsResponseType>>(state => state.gallery.locations)





        return (
            <div className={s.selects__Block}>

                <SelectsBlockNameInput/>


                <SelectItem title={'Author'} authors={authors}/>
                <SelectItem title={'Location'} locations={locations}/>

                <SelectWithDate/>
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
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const dispatch = useDispatch()
    const history = useNavigate()

    return <div className={isOpen ? `${s.select} ${s.is__active}` : s.select}>
        <div className={s.selectHeader} onClick={() => setIsOpen(!isOpen)}>
            <span className={s.select__current}>{title}</span>
            {/*<div className={s.select__icon} onClick={() => setTitle(props.title)}>&times;</div>*/}
            <div className={`${s.select__icon} ${s.select__icon__arrow}`}>&#9660;</div>
        </div>
        <div className={s.selectBody}>
            {
                props.authors && props.authors.map(option => <div key={option.id}
                                                                  className={s.select__item}
                                                                  onClick={() => {
                                                                      history({pathname: `/authorId=${option.id}`})
                                                                      // dispatch(getCardsTC({data: `authorId=${option.id}`}))
                                                                      setTitle(option.name)
                                                                      setIsOpen(false)
                                                                  }}
                        // onMouseOver={() => setValue(option.name)}
                        //                                           onBlur={() => setIsOpen(false)}
                    >
                        {option.name}
                    </div>
                )}

            {
                props.locations && props.locations.map(option => <div key={option.id}
                                                                      className={s.select__item}
                                                                      onClick={() => {
                                                                          history({pathname: `/id=${option.id}`})
                                                                          // dispatch(getCardsTC({data: `id=${option.id}`}))
                                                                          setTitle(option.location)
                                                                          setIsOpen(false)
                                                                      }}
                        // onMouseOver={() => setValue(option.name)}
                    >
                        {option.location}
                    </div>
                )}
        </div>

    </div>
}

const SelectsBlockNameInput = () => {
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const history = useNavigate()
    const onKeyUpHandler = useDebounce(() => {
        if(name) {
            history({pathname: `/q=${name}`})
        } else {
            history({pathname: `/`})
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
        <div className={s.selectHeader}>
            {/*<span className={s.select__current} style={{ width: "100%"}}>*/}
            <input
                className={s.select__current}
                style={{
                    width: '100%',
                    outline: 'none',
                    border: 'none', height: '100%', padding: '10', margin: '0',
                    boxSizing: 'border-box', borderRadius: '8px'
                }}
                type="text"
                placeholder={'Name'}
                value={name}
                onChange={setInputValueHandler}
                onKeyUp={onKeyUpHandler}
                onKeyPress={onEnterPressHandler}
            />
            {/*</span>*/}


        </div>


    </div>
}


const SelectWithDate = () => {
    const [from, setFrom] = useState<string | number>('')
    const [before, setBefore] = useState<string | number>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const history = useNavigate()

    const onKeyUpHandler = useDebounce(() => {
        if(from && before) {
            history({pathname: `created_gte=${from}&created_lte=${before}`})
        } else {
            history({pathname: `/`})
        }

    }, 1000)

    return <div className={isOpen ? `${s.select} ${s.is__active}` : s.select}>
        <div className={isOpen ? s.selectHeader__test : s.selectHeader}
             onClick={() => setIsOpen(!isOpen)}>
            <span className={s.select__current}>{'Created'}</span>
            <div className={`${s.select__icon} ${s.select__icon__arrow}`}>&#9660;</div>

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
                <div style={{textAlign: 'center'}}>-</div>
                <input type="number"
                       className={s.created__year__field}
                       placeholder={'before'}
                       value={before}
                       onChange={(e) => {
                           setBefore(e.currentTarget.value)
                       }}
                onKeyUp={onKeyUpHandler}
                />

                {/*<button onClick={() => {*/}
                {/*    dispatch(getCardsTC({data: `created_gte=${from}&created_lte=${before}`}))*/}
                {/*}}>find*/}
                {/*</button>*/}


            </div>
        </div>
    </div>

}


//
// <div className={isOpen ? `${s.select} ${s.is__active}` : s.select}>
//     <div className={s.selectHeader} onClick={() => setIsOpen(!isOpen)}>
//         <span className={s.select__current}>{title}</span>
//         {/*<div className={s.select__icon} onClick={() => setTitle(props.title)}>&times;</div>*/}
//         <div className={`${s.select__icon} ${s.select__icon__arrow}`}>&#9660;</div>
//     </div>
//     <div className={s.selectBody}>
//
//
//     </div>
//
// </div>
