import React from 'react';
import {AuthorsResponseType, LocationsResponseType} from '../../utils/api';
import {useSelector} from 'react-redux';
import s from './Select.module.css'
import {IAppStore} from '../../store/store';
import {SelectWithDate} from './SelectWithDate/SelectWithDate';
import {SelectNameInput} from './SelectNameInput/SelectNameInput';
import {SelectWithOptions} from './SelectWithOptions/SelectWithOptions';

const SelectsBlock = React.memo(() => {

        const authors = useSelector<IAppStore, Array<AuthorsResponseType>>(state => state.gallery.authors)
        const locations = useSelector<IAppStore, Array<LocationsResponseType>>(state => state.gallery.locations)


        return (
            <div className={s.selects__Block}>
                <SelectNameInput/>
                <SelectWithOptions title={'Author'} authors={authors}/>
                <SelectWithOptions title={'Location'} locations={locations}/>
                <SelectWithDate/>
            </div>
        );
    }
)
export default SelectsBlock;





