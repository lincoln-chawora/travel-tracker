import {createContext, useContext, useEffect, useReducer} from "react";
import {cityReducer} from "../reducers/cityReducer.js";

const CitiesContext = createContext();
const BASE_URL = 'http://localhost:9000/cities';

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: ''
}

function CitiesProvider({children}) {
    const [{cities, isLoading, currentCity}, dispatch] = useReducer(cityReducer, initialState);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchCities() {
            dispatch({type: 'loading'});
            try {
                const response = await fetch(`${BASE_URL}`, { signal: controller.signal });

                if (!response.ok) throw new Error('Something went wrong with fetching cities.');

                const data = await response.json();

                dispatch({type: 'cities/loaded', payload: data});
            } catch (error) {
                dispatch({type: 'rejected', payload: error.message});
            }
        }

        void fetchCities();

        return () => {
            controller.abort();
        }
    }, []);

    async function getCity(id) {
        if (Number(id) === currentCity.id) return;

        dispatch({type: 'loading'});
        try {
            const response = await fetch(`${BASE_URL}${id ? `/${id}` : ''}`);

            if (!response.ok) throw new Error('Something went wrong with fetching city.');

            const data = await response.json();

            dispatch({type: 'city/loaded', payload: data});
        } catch (error) {
            dispatch({type: 'rejected', payload: error.message});
        }
    }

    async function deleteCity(id) {
        dispatch({type: 'loading'});
        try {
            const response = await fetch(`${BASE_URL}${id ? `/${id}` : ''}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error('Something went wrong with deleting city.');
            dispatch({type: 'city/deleted', payload: id});
        } catch (error) {
            dispatch({type: 'rejected', payload: error.message});
        }
    }

    async function createCity(newCity) {
        dispatch({type: 'loading'});
        try {
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

    async function updateCity(id, updatedCity) {
        dispatch({type: 'loading'});
        try {
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

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            getCity,
            createCity,
            updateCity,
            deleteCity,
            currentCity
        }}>
            {children}
        </CitiesContext.Provider>
    )
}

function useCitiesContext() {
    const context = useContext(CitiesContext);

    if (context === undefined) throw Error('Cities context was used outside of post provider.');

    return context;
}

export {CitiesProvider, useCitiesContext};