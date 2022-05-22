import React, {useEffect} from 'react';
import {cardsApi} from '../../utils/api';
import GalleryBlock from '../PhotosBlock/GalleryBlock';
import SelectsBlock from '../SelectsBlock/SelectsBlock';
import Pagination from '../Pagination/Pagination';
import {useDispatch} from 'react-redux';
import {useSearchParams} from 'react-router-dom';
import {getCardsTC, setAuthors, setLocations, setUrlParams} from '../../store/gallery-reducer';

const Main = () => {
    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        dispatch(setUrlParams({urlParams: Object.fromEntries(searchParams)}))
        dispatch(getCardsTC({data: searchParams}))

    }, [searchParams])

    useEffect(() => {

        cardsApi.getAuthors().then((res) => {
         dispatch(setAuthors({authors: res.data}))
        })
    }, [])

    useEffect(() => {
        cardsApi.getLocations().then((res) => {
            dispatch(setLocations({locations: res.data}))
        })
    }, [])

    return (
        <div>
            <SelectsBlock/>
            <GalleryBlock/>
            <Pagination/>
        </div>
    );
}

export default Main;
