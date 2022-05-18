import React from 'react';
import {PaintingsResponseType} from '../utils/api';

const PhotoItem = React.memo((props: {picture: PaintingsResponseType }) => {


    return (
        <div style={{padding: "20px", margin: "10px"}}>
            <span>{props.picture.name}</span>
            <div>
                <img src={`https://test-front.framework.team${props.picture.imageUrl}`} width={"400px"} alt=""/>
            </div>
        </div>
    );
})

export default PhotoItem;
