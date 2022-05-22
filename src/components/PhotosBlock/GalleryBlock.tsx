import React from 'react';
import PhotoItem from './PhotoItem/PhotoItem';
import {PaintingsResponseType} from '../../utils/api';
import {useSelector} from 'react-redux';
import {IAppStore} from '../../store/store';

const GalleryBlock = () => {

    const currentPage = useSelector<IAppStore, number>(state => state.gallery.currentPage)
    const itemsPerPage = useSelector<IAppStore, number>(state => state.gallery.itemsPerPage)
    const paintings = useSelector<IAppStore, Array<PaintingsResponseType>>(state => state.gallery.paintings)

    let end = currentPage * itemsPerPage
    let start = end - itemsPerPage

    // let paintings
    let mappedArray = paintings.slice(start, end);
    if (paintings.length < 12) {
        mappedArray = paintings
    }


    return (
        <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',
            minHeight: '56vh',
        }}>
            {paintings.length
                ? mappedArray.map(p => <PhotoItem key={p.id} picture={p}/>)
                : <div style={{color: 'black', margin: "20px auto"}}>There are no pictures matching the specified filter.
                    Please set a different value.</div>
            }
        </div>
    );
}

export default GalleryBlock;
