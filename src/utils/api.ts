import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://test-front.framework.team/'
});

//types

export type PaintingsResponseType = {
    authorId: number
    created: string
    id: number
    imageUrl: string
    locationId: number
    name: string
}

export type AuthorsResponseType = {
    id: number
    name: string
}

export type LocationsResponseType = {
    id: number
    location: string
}




export const cardsApi = {
    getPictures(payload?: {data:string}) {
        return instance.get<Array<PaintingsResponseType>>(payload? `paintings?${payload.data}`  : "paintings");
    },
    getAuthors() {
        return instance.get<Array<AuthorsResponseType>>(`authors`);
    },
    getLocations() {
        return instance.get<Array<LocationsResponseType>>(`locations`);
    },
}