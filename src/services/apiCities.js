import {BASE_URL} from "../utils/util.js";

export async function deleteCity(id, dispatch) {
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
        dispatch({type: 'rejected', payload: error.message});
    }
}

export async function createCity(newCity, dispatch) {
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
        dispatch({type: 'rejected', payload: error.message});
    }
}

export async function updateCity(id, updatedCity, dispatch) {
    try {
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
        dispatch({type: 'rejected', payload: error.message});
    }
}

export async function getAllCities(dispatch) {
    try {
        dispatch({type: 'loading'});
        const response = await fetch(`${BASE_URL}`);

        if (!response.ok) throw new Error('Something went wrong with fetching cities.');

        const data = await response.json();

        dispatch({type: 'cities/loaded', payload: data});
    } catch (error) {
        dispatch({type: 'rejected', payload: error.message});
    }
}