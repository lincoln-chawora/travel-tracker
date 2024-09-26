import styles from "./CityItem.module.css";
import {Link} from "react-router-dom";
import {useCitiesContext} from "../contexts/useCitiesContext";
import {deleteCity} from "../services/apiCities";
import {formatDate} from "../utils/util";

function CityItem({ city }) {
    const {currentCity, dispatch} = useCitiesContext();

    const {cityName, emoji, date, id, position } = city;

    async function handleDelete(e) {
        e.preventDefault();

        await deleteCity(id, dispatch);
    }

  return (
    <li>
        <Link
            to={`${id}?lat=${position.lat}&lng=${position.lng}`}
            className={`${styles.cityItem} ${currentCity.id === id ? styles['cityItem--active'] : ''}`}
        >
            <span className={styles.emoji}>{emoji}</span>
            <span className={styles.name}>{cityName}</span>
            <time className={styles.date}>({formatDate(date)})</time>
            <button onClick={e => handleDelete(e)} className={styles.deleteBtn}>&times;</button>
        </Link>
    </li>
  );
}

export default CityItem;
