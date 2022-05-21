import React, {useState} from 'react';
import {AuthorsResponseType, LocationsResponseType, PaintingsResponseType} from '../../../utils/api';
import s from './PhotoItem.module.css'
import {useSelector} from 'react-redux';
import {IAppStore} from '../../../store/store';

const PhotoItem = React.memo((props: { picture: PaintingsResponseType }) => {
    const [hover, setHover] = useState(false)

    const authors = useSelector<IAppStore, Array<AuthorsResponseType>>(state => state.gallery.authors)
    const locations = useSelector<IAppStore, Array<LocationsResponseType>>(state => state.gallery.locations)
    const currentAuthor = authors.find(a => a.id === props.picture.authorId)
    const currentLocation = locations.find(a => a.id === props.picture.locationId)


    return (
        <div className={s.photoItem__container}>
            <div className={s.photoItem}
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <img
                    src={`https://test-front.framework.team${props.picture.imageUrl}`}
                    alt={props.picture.name}
                    className={s.photoItem__img}
                />
                {
                    hover
                        ? <div className={`${s.photoItem__Title__common} ${s.photoItem__title__hover}`}>
                            <div className={s.photoItem__title__hover__container}>
                                <div className={s.photoItem__title__hover__title}>{props.picture.name}</div>

                                <div>
                                    <span className={s.photoItem__title__hover__dataField}>Author: </span>
                                    <span>{currentAuthor && currentAuthor.name}</span>
                                </div>
                                <div>
                                    <span className={s.photoItem__title__hover__dataField}>Created: </span>
                                    <span>{props.picture.created}</span>
                                </div>
                                <div>
                                    <span className={s.photoItem__title__hover__dataField}>Location: </span>
                                    <span>{currentLocation && currentLocation.location}</span>
                                </div>
                            </div>
                        </div>
                        : <div className={`${s.photoItem__Title__common} ${s.photoItem__paintingTitle}`}>
                            <span className={s.photoItem__paintingTitle__container}>{props.picture.name}</span>
                        </div>
                }

            </div>
        </div>

    );
})

export default PhotoItem;
