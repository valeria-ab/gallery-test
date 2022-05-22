import React from 'react';
import './App.css';
import {useSelector} from 'react-redux';
import {IAppStore} from '../../store/store';
import {Header} from '../Header/Header';
import {Route, Routes} from 'react-router-dom';
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
                    <Route path={'/*'} element={<div>Page not found</div>}/>
                </Routes>
            </div>
        );
    }
)
export default App;
