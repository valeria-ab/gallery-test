import React, {useEffect, useState} from 'react';
import {cardsApi, PaintingsResponseType} from '../utils/api';
import GalleryBlock from '../PhotosBlock/GalleryBlock';

const Main = () => {

  return (
    <div>
        <div style={{border: "2px solid blue", margin: "5px"}}>hello this is header</div>
        <div style={{border: "2px solid green", margin: "5px"}}>selects</div>

        <div style={{border: "2px solid red", margin: "5px"}}>photos</div>
        <div style={{border: "2px solid yellow", margin: "5px"}}>pagination</div>
    </div>
  );
}

export default Main;
