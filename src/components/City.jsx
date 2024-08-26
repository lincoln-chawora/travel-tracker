import styles from "./City.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {useCitiesContext} from "../contexts/useCitiesContext.js";
import {useEffect} from "react";
import Spinner from "./Spinner.jsx";
import {BackButton} from "./BackButton";
import {Button} from "./Button";
import {useUrlPosition} from "../hooks/useUrlPosition.js";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export function City() {
    // Url param defined on route path such as: <Route path="cities/:id" />
    const {id} = useParams();
    const navigate = useNavigate();
    const [mapLat, mapLng] = useUrlPosition();

    const {getCity, currentCity, isLoading} = useCitiesContext();

    // Get city when id changes (change of page from url).
    useEffect(() => {
        getCity(id);
    }, [id, getCity]);

    const { cityName, emoji, date, notes } = currentCity;

    function handleEdit() {
        navigate(`/app/form?lat=${mapLat}&lng=${mapLng}&cityID=${id}`)
    }

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
            <p>{formatDate(date || null)}</p>
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

              {mapLat && mapLat && <Button type='primary' onClick={e => handleEdit(e)}>Edit</Button>}
          </div>
        </div>
    );
}
