import styles from "./CityItem.module.css";
import {Link} from "react-router-dom";
import {useCitiesContext} from "../contexts/useCitiesContext";
import {deleteCity} from "../services/apiCities";
import {formatDate} from "../utils/util";
import React from "react";
import { City } from "../reducers/data.modals";

interface CityItemProps {
    city: City
}
const CityItem: React.FC<CityItemProps> = ({ city }) => {
    const {currentCity, dispatch} = useCitiesContext();

    const {cityName, emoji, date, id, position } = city;

    async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        await deleteCity(id!, dispatch);
    }

  return (
    <li>
        <Link
            to={`${id}?lat=${position.lat}&lng=${position.lng}`}
            className={`${styles.cityItem} ${'id' in currentCity && currentCity.id === id ? styles['cityItem--active'] : ''}`}
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
