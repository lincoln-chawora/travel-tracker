import {useCallback, useEffect, useReducer} from "react";
import {cityReducer} from "../reducers/cityReducer.js";
import {CitiesContext} from "./useCitiesContext.js";

const BASE_URL = 'http://localhost:9000/cities';

const initialState = {
    cities: [],
    citiesSort: true,
    isLoading: false,
    currentCity: {},
    error: ''
}

function CitiesProvider({children}) {
    const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(cityReducer, initialState);

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

    // useCallback will memoize the getCity function so that it's only rendered when the currentCity.id value changes.
    const getCity = useCallback(async function getCity(id) {
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
    }, [currentCity.id]);

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

    function sortByDate() {
        dispatch({type: 'sortCitiesByDate'});
    }

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            getCity,
            createCity,
            updateCity,
            deleteCity,
            sortByDate,
            error,
            currentCity
        }}>
            {children}
        </CitiesContext.Provider>
    )
}

export {CitiesProvider};