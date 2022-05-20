import React, {useEffect, useState} from 'react';
import './App.css';
import {cardsApi, PaintingsResponseType} from '../../utils/api';
import GalleryBlock from '../PhotosBlock/GalleryBlock';
import SelectsBlock from '../SelectsBlock/SelectsBlock';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../../store/store';
import {getCardsTC} from '../../store/gallery-reducer';
import Pagination from '../Pagination/Pagination';
import {Header} from '../Header/Header';
import {Routes, Route, useParams} from 'react-router-dom';
import Main from '../Main/Main';

const App = React.memo(() => {

        // const authorId = useSelector<IAppStore, string>(state => state.gallery.authorId)
        // const galleryId = useSelector<IAppStore, number | null>(state => state.gallery.galleryId)
    const isNightModeOn = useSelector<IAppStore, boolean>(state => state.gallery.isNightModeOn)



    return (
            <div className={isNightModeOn ? 'App ' + 'App__nightMode' : 'App'}>
                <Header/>
                <Routes>
                    <Route path={'/'} element={<Main/>}/>
                    <Route path={'/:param'} element={<Main/>}/>
                </Routes>
            </div>
        );
    }
)
export default App;
