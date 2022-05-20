import React, {useEffect, useState} from 'react';
import {cardsApi, PaintingsResponseType} from '../../utils/api';
import GalleryBlock from '../PhotosBlock/GalleryBlock';
import SelectsBlock from '../SelectsBlock/SelectsBlock';
import Pagination from '../Pagination/Pagination';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../store/store';
import {useParams} from 'react-router-dom';
import {getCardsTC} from '../../store/gallery-reducer';

const Main = () => {
    const dispatch = useDispatch()
    const {param} = useParams()

    const paintings = useSelector<IAppStore, Array<PaintingsResponseType>>(state => state.gallery.paintings)


    useEffect(() => {
        if (param) {
            dispatch(getCardsTC({data: param}))
        } else {
            dispatch(getCardsTC())
        }

    }, [param])

    return (
        <div>
            <SelectsBlock/>
            <GalleryBlock pictures={paintings}/>
            <Pagination/>
        </div>
    );
}

export default Main;
