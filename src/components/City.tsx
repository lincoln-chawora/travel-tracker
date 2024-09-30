import React, {useEffect} from "react";
import styles from "./City.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {useCitiesContext} from "../contexts/useCitiesContext";
import Spinner from "./Spinner";
import {BackButton} from "./BackButton";
import Button from "./Button";
import {useUrlPosition} from "../hooks/useUrlPosition";
import {formatDate, isCity} from "../utils/util";

const City: React.FC = () => {
    // Url param defined on route path such as: <Route path="cities/:id" />
    let {id} = useParams();

    const navigate = useNavigate();
    const [mapLat, mapLng] = useUrlPosition();

    const {getCity, currentCity, isLoading} = useCitiesContext();

    // Get city when id changes (change of page from url).
    useEffect(() => {
      if (id) {
        getCity(+id);
      }
    }, [id, getCity]);

    function handleEdit() {
        navigate(`/app/form?lat=${mapLat}&lng=${mapLng}&cityID=${id}`)
    }

    if (!isCity(currentCity)) return false;

    let { cityName, emoji, date, notes } = currentCity;

    if (isLoading) return <Spinner />;

    return (
        <div className={styles.city}>
          <div className={styles.row}>
            <h6>City name</h6>
            <h3>
              <span>{emoji}</span> {cityName}
            </h3>
          </div>

          <div className={styles.row}>
            <h6>You went to {cityName} on</h6>
            <p>{formatDate(date)}</p>
          </div>

          {notes && (
            <div className={styles.row}>
              <h6>Your notes</h6>
              <p>{notes}</p>
            </div>
          )}

          <div className={styles.row}>
            <h6>Learn more</h6>
            <a
              href={`https://en.wikipedia.org/wiki/${cityName}`}
              target="_blank"
              rel="noreferrer"
            >
              Check out {cityName} on Wikipedia &rarr;
            </a>
          </div>

          <div className={styles.btnContainer}>
              <BackButton />

              {mapLat && mapLat && <Button type='primary' onClick={handleEdit}>Edit</Button>}
          </div>
        </div>
    );
}

export default City;