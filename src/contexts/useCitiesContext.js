import {createContext, useContext} from "react";

const CitiesContext = createContext();

export function useCitiesContext() {
    const context = useContext(CitiesContext);

    if (context === undefined) throw Error('Cities context was used outside of post provider.');

    return context;
}

export {CitiesContext};