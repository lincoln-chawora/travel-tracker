import styles from "./CityList.module.css"
import CityItem from "./CityItem.jsx";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import {useCitiesContext} from "../contexts/useCitiesContext.js";

export function CityList() {
    const {cities, isLoading, sortByDate} = useCitiesContext();

    if (isLoading) return <Spinner />;

    // If there's no cities show message.
    if (!cities.length) return <Message message="Add your first city by cling on a city on the map" />

    function handleSort() {
        sortByDate();
    }

    return (
        <div className={styles.cityList}>
            <button onClick={handleSort}>Sort by date</button>
            {cities.map(city => <CityItem key={city.id} city={city} />)}
        </div>
    )
}