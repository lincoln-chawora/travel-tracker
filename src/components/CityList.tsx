import styles from "./CityList.module.css"
import CityItem from "./CityItem.js";
import Spinner from "./Spinner";
import Message from "./Message";
import {useCitiesContext} from "../contexts/useCitiesContext.js";
import React from "react";

export const CityList: React.FC = () => {
    const {cities, isLoading, dispatch} = useCitiesContext();

    if (isLoading) return <Spinner />;

    // If there's no cities show message.
    if (!cities.length) return <Message message="Add your first city by cling on a city on the map" />

    function handleSort() {
        dispatch({type: 'sortCitiesByDate'});
    }

    return (
        <div className={styles.cityList}>
            <button onClick={handleSort}>Sort by date</button>
            {cities.map(city => <CityItem key={city.id} city={city} />)}
        </div>
    )
}