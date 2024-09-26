import { City } from "../reducers/data.modals";
import { CITY_ACTION_TYPE } from "../reducers/cityReducer";
import {BASE_URL, getErrorMessage} from "../utils/util";

export async function deleteCity(id: number, dispatch: React.Dispatch<CITY_ACTION_TYPE>) {
    try {
        dispatch({type: 'loading'});
        const response = await fetch(`${BASE_URL}${id ? `/${id}` : ''}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            Error('Something went wrong with deleting city.');
            return;
        }
        dispatch({type: 'city/deleted', payload: id});
    } catch (error) {
        dispatch({type: 'rejected', payload: getErrorMessage(error)});
    }
}

export async function createCity(newCity: City, dispatch: React.Dispatch<CITY_ACTION_TYPE>) {
    try {
        dispatch({type: 'loading'});
        const response = await fetch(`${BASE_URL}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCity)
        });

        if (!response.ok) throw new Error('Something went wrong with created city.');

        const data = await response.json();
        dispatch({type: 'city/created', payload: data});
    } catch (error) {
        dispatch({type: 'rejected', payload: getErrorMessage(error)});
    }
}

export async function updateCity(id: number, updatedCity: City, dispatch: React.Dispatch<CITY_ACTION_TYPE>) {
    try {
        console.log('API', updatedCity);
        dispatch({type: 'loading'});
        const response = await fetch(`${BASE_URL}${id ? `/${id}` : ''}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCity)
        });

        if (!response.ok) throw new Error('Something went wrong with updating city.');

        const data = await response.json();
        dispatch({type: 'city/updated', payload: data});
    } catch (error) {
        dispatch({type: 'rejected', payload: getErrorMessage(error)});
    }
}

export async function getAllCities(dispatch: React.Dispatch<CITY_ACTION_TYPE>) {
    try {
        dispatch({type: 'loading'});
        const response = await fetch(`${BASE_URL}`);

        if (!response.ok) throw new Error('Something went wrong with fetching cities.');

        const data = await response.json();

        dispatch({type: 'cities/loaded', payload: data});
    } catch (error) {
        dispatch({type: 'rejected', payload: getErrorMessage(error)});
    }
}