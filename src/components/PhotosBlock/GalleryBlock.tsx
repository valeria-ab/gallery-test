import React, {useEffect, useState} from 'react';
import PhotoItem from './PhotoItem/PhotoItem';
import {PaintingsResponseType} from '../../utils/api';
import {useSelector} from 'react-redux';
import {IAppStore} from '../../store/store';

type PropsType = {
    pictures: Array<PaintingsResponseType>

}
const GalleryBlock = (props: PropsType) => {

    const currentPage = useSelector<IAppStore, number>(state => state.gallery.currentPage)
    const itemsPerPage = useSelector<IAppStore, number>(state => state.gallery.itemsPerPage)

    let end = currentPage * itemsPerPage
    let start = end - itemsPerPage

    let paintings = props.pictures.slice(start, end)
    let mappedArray = paintings;
    if(props.pictures.length < 12) {
        mappedArray = props.pictures
    }


    return (
        <div style={{display: "flex", flexWrap: "wrap" , justifyContent: "space-between"}}>
            {
                mappedArray.map(p => <PhotoItem key={p.id} picture={p}/>)
            }

        </div>
    );
}

export default GalleryBlock;
