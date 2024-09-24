import {useCallback, useEffect, useReducer} from "react";
import {cityReducer} from "../reducers/cityReducer.js";
import {CitiesContext} from "./useCitiesContext.js";
import {BASE_URL, initialCityState} from "../utils/util.js";
import {getAllCities} from "../services/apiCities.js";

function CitiesProvider({children}) {
    const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(cityReducer, initialCityState);

    useEffect(() => {
        getAllCities(dispatch).then(r => console.log('Cities data Data loaded'));
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