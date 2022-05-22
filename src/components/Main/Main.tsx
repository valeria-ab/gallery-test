import React, {useEffect, useState} from 'react';
import {cardsApi, PaintingsResponseType} from '../../utils/api';
import GalleryBlock from '../PhotosBlock/GalleryBlock';
import SelectsBlock from '../SelectsBlock/SelectsBlock';
import Pagination from '../Pagination/Pagination';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../store/store';
import {useParams, useSearchParams} from 'react-router-dom';
import {getCardsTC, setAuthors, setLocations} from '../../store/gallery-reducer';

const Main = () => {
    const dispatch = useDispatch()

    const paintings = useSelector<IAppStore, Array<PaintingsResponseType>>(state => state.gallery.paintings)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        if (searchParams) {
            dispatch(getCardsTC({data: searchParams}))
        } else {
            dispatch(getCardsTC())
        }

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
            <GalleryBlock pictures={paintings}/>
            <Pagination/>
        </div>
    );
}

export default Main;
