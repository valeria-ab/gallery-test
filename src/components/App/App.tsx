import React from 'react';
import './App.css';
import {useSelector} from 'react-redux';
import {IAppStore} from '../../store/store';
import {Header} from '../Header/Header';
import {Route, Routes} from 'react-router-dom';
import Main from '../Main/Main';

const App = React.memo(() => {

 const isNightModeOn = useSelector<IAppStore, boolean>(state => state.gallery.isNightModeOn)

    return (
            <div className={isNightModeOn ? 'App ' + 'App__nightMode' : 'App'}>
                <div className={'App__container'}>
                <Header/>
                <Routes>
                    <Route path={'/'} element={<Main/>}/>
                    <Route path={'/*'} element={<div>Page not found</div>}/>
                </Routes>
                </div>
            </div>
        );
    }
)
export default App;
