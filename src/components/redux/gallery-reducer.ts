import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {IAppStore} from './store';
import {AnyAction, Dispatch} from 'redux';
import {cardsApi, PaintingsResponseType} from '../utils/api';


export type InitialCardsStateType = {
    paintings: Array<PaintingsResponseType>
    galleryId: number | null
    q: string | null
    _gte: string | null
    _lte: string | null
    _page: number | null
    _limit: number | null
    anyObjectField: string | number | null
    authorId: string

    currentPage: number
}

const initialState: InitialCardsStateType = {
    paintings: [] as Array<PaintingsResponseType>,
    galleryId: null,
    q: null,
    _gte: null,
    _lte: null,
    _page: null,
    _limit: null,
    anyObjectField: null,
    authorId: "",
    currentPage: 1 // for pagination
};

export const galleryReducer = (state: InitialCardsStateType = initialState, action: ActionsType): InitialCardsStateType => {
    switch (action.type) {

        case 'GALLERY/SET-PAINTINGS':
        // case 'GALLERY/SET-AUTHOR-ID':
        // case 'GALLERY/SET-LOCATION-ID':
        case 'GALLERY/SET-PAGE':
            return {...state, ...action.payload}

        default:
            return state;
    }
};


export const setPaintings = (payload: {paintings: Array<PaintingsResponseType>}) => ({type: 'GALLERY/SET-PAINTINGS', payload} as const)
// export const setAuthorId = (payload: {authorId: string}) => ({type: 'GALLERY/SET-AUTHOR-ID', payload} as const)
// export const setLocationId = (payload: {galleryId: number}) => ({type: 'GALLERY/SET-LOCATION-ID', payload} as const)
export const setPage = (payload: {currentPage: number}) => ({type: 'GALLERY/SET-PAGE', payload} as const)



type ActionsType =
    // | ReturnType<typeof setAuthorId>
    | ReturnType<typeof setPaintings>
    | ReturnType<typeof setPage>
    // | ReturnType<typeof setLocationId>



// thunk

export const getCardsTC = (payload?: {data: string}):any =>
    (dispatch: Dispatch, getState: () => IAppStore) => {
        const {
            authorId,
            galleryId,
        } = getState().gallery;


        // dispatch(setAppLoading("loading"))
        cardsApi.getPictures(payload && payload)
            .then((res) => {

                dispatch(setPaintings({paintings: res.data}))
                dispatch(setPage( {currentPage: 1}))
            })
            .catch((err) => {
                // dispatch(setErrorAC(err.response.data.error))
                alert((err))

            })
            .finally(() => {}
                // dispatch(setAppLoading("idle"))
            )
    }
