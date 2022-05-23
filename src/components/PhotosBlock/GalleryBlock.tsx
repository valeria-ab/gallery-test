import React from 'react';
import PhotoItem from './PhotoItem/PhotoItem';
import {PaintingsResponseType} from '../../utils/api';
import s from './Gallery.module.css';
import {useSelector} from 'react-redux';
import {IAppStore} from '../../store/store';

const GalleryBlock = () => {

    const currentPage = useSelector<IAppStore, number>(state => state.gallery.currentPage)
    const itemsPerPage = useSelector<IAppStore, number>(state => state.gallery.itemsPerPage)
    const paintings = useSelector<IAppStore, Array<PaintingsResponseType>>(state => state.gallery.paintings)
    const isNightModeOn = useSelector<IAppStore, boolean>(state => state.gallery.isNightModeOn)
    const loadingStatus = useSelector<IAppStore, 'idle' | 'loading'>(state => state.gallery.loadingStatus)

    const notFoundTextSpan = isNightModeOn
        ? {color: 'white', margin: "20px auto"}
        : {color: 'black', margin: "20px auto"}
    let end = currentPage * itemsPerPage
    let start = end - itemsPerPage

    let mappedArray = paintings.slice(start, end);
    if (paintings.length < 12) {
        mappedArray = paintings
    }


    return (
        <div className={s.gallery__container}>
            {paintings.length
                ? mappedArray.map(p => <PhotoItem key={p.id} picture={p}/>)
                : loadingStatus !== 'loading' && <div style={notFoundTextSpan}>There are no pictures matching the specified filter.
                Please set a different value.</div>
            }
        </div>
    );
}

export default GalleryBlock;
