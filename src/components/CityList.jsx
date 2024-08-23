import styles from "./CityList.module.css"
import CityItem from "./CityItem.jsx";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import {useCitiesContext} from "../contexts/useCitiesContext.js";

export function CityList() {
    const {cities, isLoading} = useCitiesContext();

    if (isLoading) return <Spinner />;

    // If there's no cities show message.
    if (!cities.length) return <Message message="Add your first city by cling on a city on the map" />

    return (
        <div className={styles.cityList}>
            {cities.map(city => <CityItem key={city.id} city={city} />)}
        </div>
    )
}