import {useCallback, useEffect, useReducer} from "react";
import {cityReducer} from "../reducers/cityReducer.js";
import {CitiesContext} from "./useCitiesContext.js";
import {BASE_URL} from "../utils/util.js";

export const initialState = {
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

    function sortByDate() {
        dispatch({type: 'sortCitiesByDate'});
    }

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            getCity,
            dispatch,
            sortByDate,
            error,
            currentCity
        }}>
            {children}
        </CitiesContext.Provider>
    )
}

export {CitiesProvider};