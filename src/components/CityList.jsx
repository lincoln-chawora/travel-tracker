import styles from "./CityList.module.css"
import CityItem from "./CityItem.jsx";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";

export function CityList({cities, isLoading}) {
    if (isLoading) return <Spinner />;

    if (!cities.length) return <Message message="Add your first city by cling on a city on the map" />

    return (
        <div className={styles.cityList}>
            {cities.map(city => <CityItem key={city.id} city={city} />)}
        </div>
    )
}