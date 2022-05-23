import {Dispatch} from 'redux';
import {AuthorsResponseType, cardsApi, LocationsResponseType, PaintingsResponseType} from '../utils/api';

export type UrlParamsType = {
    authorId?: string
    id?: string
    q?: string
    created_gte?: string,
    created_lte?: string
}

export type InitialCardsStateType = {
    paintings: Array<PaintingsResponseType>
    authors: Array<AuthorsResponseType>
    locations: Array<LocationsResponseType>
    isNightModeOn: boolean
    currentPage: number
    itemsPerPage: number
    urlParams: UrlParamsType
    loadingStatus: 'idle' | 'loading'
}

const initialState: InitialCardsStateType = {
    paintings: [] as Array<PaintingsResponseType>,
    authors: [],
    locations: [],
    currentPage: 1, // for pagination
    isNightModeOn: false,
    itemsPerPage: 12,
    urlParams: {},
    loadingStatus: 'idle',
};

export const galleryReducer = (state: InitialCardsStateType = initialState, action: ActionsType): InitialCardsStateType => {
    switch (action.type) {

        case 'GALLERY/SET-PAINTINGS':
        case 'GALLERY/SET-AUTHORS':
        case 'GALLERY/SET-LOCATIONS':
        case 'GALLERY/SET-URL-PARAMS':
        case 'GALLERY/SET-LOADING':
        case 'GALLERY/SET-PAGE':
        case 'GALLERY/SET-IS-NIGHT-MODE-ON':
            return {...state, ...action.payload}

        default:
            return state;
    }
};


export const setPaintings = (payload: { paintings: Array<PaintingsResponseType> }) => ({
    type: 'GALLERY/SET-PAINTINGS',
    payload
} as const)
export const setUrlParams = (payload: { urlParams: UrlParamsType }) => ({
    type: 'GALLERY/SET-URL-PARAMS',
    payload
} as const)
export const setAuthors = (payload: { authors: Array<AuthorsResponseType> }) => ({
    type: 'GALLERY/SET-AUTHORS',
    payload
} as const)
export const setLocations = (payload: { locations: Array<LocationsResponseType> }) => ({
    type: 'GALLERY/SET-LOCATIONS',
    payload
} as const)
export const setLoading = (payload: { loadingStatus: 'idle' | 'loading' }) => ({
    type: 'GALLERY/SET-LOADING',
    payload
} as const)
export const setPage = (payload: { currentPage: number }) => ({type: 'GALLERY/SET-PAGE', payload} as const)
export const setIsNightModeOn = (payload: { isNightModeOn: boolean }) => ({
    type: 'GALLERY/SET-IS-NIGHT-MODE-ON',
    payload
} as const)


type ActionsType =
    | ReturnType<typeof setLoading>
    | ReturnType<typeof setPaintings>
    | ReturnType<typeof setAuthors>
    | ReturnType<typeof setLocations>
    | ReturnType<typeof setPage>
    | ReturnType<typeof setIsNightModeOn>
    | ReturnType<typeof setUrlParams>


// thunk

export const getCardsTC = (payload?: { data: URLSearchParams }): any =>
    (dispatch: Dispatch) => {

        dispatch(setLoading({loadingStatus: 'loading'}))
        cardsApi.getPictures(payload && payload)
            .then((res) => {
                dispatch(setPaintings({paintings: res.data}))
                dispatch(setPage({currentPage: 1}))
            })
            .catch((err) => {
                alert((err))
            })
            .finally(() => {
                    dispatch(setLoading({loadingStatus: 'idle'}))
                }
            )
    }
