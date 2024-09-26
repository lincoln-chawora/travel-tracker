import React, {createContext, useContext} from "react";
import { City } from "../reducers/data.modals";
import { CITY_ACTION_TYPE } from "../reducers/cityReducer";

interface CitiesContextType {
    cities: City[];
    currentCity: City | {};
    isLoading: boolean;
    error: string;
    getCity: (id: number) => void;
    dispatch: React.Dispatch<CITY_ACTION_TYPE>;
}
const CitiesContext = createContext<CitiesContextType>(
    {} as CitiesContextType
);


export function useCitiesContext() {
    const context = useContext(CitiesContext);

    if (context === undefined) throw Error('Cities context was used outside of post provider.');

    return context;
}

export {CitiesContext};