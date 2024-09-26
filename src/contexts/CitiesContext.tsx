import React, {ReactNode, useCallback, useEffect, useReducer} from "react";
import {cityReducer} from "../reducers/cityReducer";
import {CitiesContext} from "./useCitiesContext";
import {BASE_URL, getErrorMessage, initialCityState} from "../utils/util";
import {getAllCities} from "../services/apiCities";

interface CitiesProviderProps {
    children: ReactNode
}
const CitiesProvider: React.FC<CitiesProviderProps> = ({children}) => {
    const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(cityReducer, initialCityState);
     
    useEffect(() => {
        getAllCities(dispatch);
    }, []);
    
    const getCity = useCallback(async function getCity(id: number) {    
        if (!currentCity) return;
        if (Number(id) === currentCity!.id) return;
    
        dispatch({type: 'loading'});
        try {
            const response = await fetch(`${BASE_URL}${id ? `/${id}` : ''}`);
    
            let message = 'Something went wrong with fetching city.'
            if (!response.ok) throw new Error(message);
    
            const data = await response.json();
    
            dispatch({type: 'city/loaded', payload: data});
        } catch (error) {
            dispatch({type: 'rejected', payload: getErrorMessage(error)});
        }
    }, [currentCity!.id]);


    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            getCity,
            dispatch,
            error,
            currentCity
        }}>
            {children}
         </CitiesContext.Provider>
    )
}

export {CitiesProvider};