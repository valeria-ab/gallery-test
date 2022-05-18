import React, {useEffect, useState} from 'react';
import './App.css';
import {cardsApi, PaintingsResponseType} from '../utils/api';
import GalleryBlock from '../PhotosBlock/GalleryBlock';
import SelectsBlock from '../SelectsLine/SelectsBlock';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from '../redux/store';
import {getCardsTC} from '../redux/gallery-reducer';
import Pagination from '../Pagination/Pagination';

const App = React.memo( () => {
  const dispatch = useDispatch()
  const authorId = useSelector<IAppStore, string>(state => state.gallery.authorId)
  const galleryId = useSelector<IAppStore, number | null>(state => state.gallery.galleryId)
  const paintings = useSelector<IAppStore, Array<PaintingsResponseType>>(state => state.gallery.paintings)


  useEffect( () => {
    dispatch(getCardsTC())
  }, [])


  return (
    <div className="App">
      <SelectsBlock/>
      <GalleryBlock pictures={paintings} />
      <Pagination/>
    </div>
  );
}
)
export default App;
