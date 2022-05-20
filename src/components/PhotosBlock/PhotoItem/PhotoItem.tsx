import React from 'react';
import {PaintingsResponseType} from '../../../utils/api';
import s from './PhotoItem.module.css'

const PhotoItem = React.memo((props: {picture: PaintingsResponseType }) => {


    return (
        <div style={{padding: "20px", margin: "10px"}} >
            {/*<span>{props.picture.name}</span>*/}
            <div className={s.photoItem} >
                <img
                    src={`https://test-front.framework.team${props.picture.imageUrl}`}
                    // width={"400px"}
                    alt={props.picture.name}
                    className={s.photoItem__img}
                />
                <span className={s.photoItem__paintingTitle}>{props.picture.name}</span>
            </div>
        </div>
    );
})

export default PhotoItem;
