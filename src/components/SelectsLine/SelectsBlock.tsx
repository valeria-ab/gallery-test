import React, {useEffect, useState} from 'react';
import {AuthorsResponseType, cardsApi, LocationsResponseType} from '../utils/api';
import {useDispatch} from 'react-redux';
import {getCardsTC} from '../redux/gallery-reducer';

const SelectsBlock = React.memo(() => {
        const dispatch = useDispatch()
        const [items, setItems] = useState<Array<AuthorsResponseType>>([])
        // console.log(items)
        const [locations, setLocations] = useState<Array<LocationsResponseType>>([])
        const [name, setName] = useState('')
        const [from, setFrom] = useState<string | number>('')
        const [before, setBefore] = useState<string | number>('')

        useEffect(() => {
            cardsApi.getAuthors().then((res) => {
                setItems(res.data)
            })
        }, [])

        useEffect(() => {
            cardsApi.getLocations().then((res) => {
                setLocations(res.data)
            })
        }, [])


        return (
            <div>
                <input type="text" placeholder={'name'}
                       onChange={(e) => {
                           setName(e.currentTarget.value)
                       }}/>
                <button  onClick={() => {
                    dispatch(getCardsTC({data: `q=${name}`}))
                }}>find</button>
                <div style={{border: "2px solid"}}>
                    {items.map(i => <div key={i.id}
                                            onClick={() => {
                                                dispatch(getCardsTC({data: `authorId=${i.id}`}))
                                            }}
                    >{i.name}</div>)}
                </div>
                <div style={{border: "2px solid", marginTop: "10px"}}>
                    {locations.map(i => <div key={i.id}
                                             onClick={() => {
                                                 dispatch(getCardsTC({data: `id=${i.id}`}))
                                             }}
                    >{i.location}</div>)}
                </div>
                <div>
                    <input type="text" placeholder={'from'} onChange={(e) => {
                        setFrom(e.currentTarget.value)
                    }}/>
                    <input type="text" placeholder={'before'} onChange={(e) => {
                        setBefore(e.currentTarget.value)
                    }}/>
                    <button onClick={() => {
                        dispatch(getCardsTC({data: `created_gte=${from}&created_lte=${before}`}))
                    }}>find</button>
                </div>
            </div>
        );
    }
)
export default SelectsBlock;
