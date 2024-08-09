import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useCitiesContext} from "../contexts/CitiesContext.jsx";
import {Button} from "./Button";
import {BackButton} from "./BackButton";
import {useUrlPosition} from "../hooks/useUrlPosition.js";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import styles from "./Form.module.css";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
    // Get lat and lng from url when form loads.
    const [lat, lng] = useUrlPosition();
    const {createCity, isLoading} = useCitiesContext();
    const navigate = useNavigate()
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [emoji, setEmoji] = useState();
    const [geocodingError, setGeocodingError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (!cityName || !date) return;
        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: {lat, lng},
        };

        await createCity(newCity);
        navigate('/app/cities');
    }

    // When lat and lng update (as a result of click on map) fetch data (city, country ect) relating to that location.
    useEffect(() => {
        if (!lat && !lng) return;

        async function fetchCityData() {
            try {
                setGeocodingError("");
                setIsLoadingGeocoding(true);
                const response = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                const data = await response.json();

                if (!data.countryCode) throw new Error("That doesnt seem to be a city. Click somewhere else.");

                setCityName(data.city || data.locality || "");
                setCountry(data.countryName);
                setEmoji(convertToEmoji(data.countryCode));
            } catch (error) {
                setGeocodingError(error.message);
            } finally {
                setIsLoadingGeocoding(false);
            }
        }
        void fetchCityData();
    }, [lat, lng]);

    if (isLoadingGeocoding || isLoading) return <Spinner />;

    if (!lng && !lat) return <Message message='Start by clicking somewhere on the map.' />;

    if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form className={`${styles.form}${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

          <DatePicker id="date" onChange={date => setDate(date)} selected={date} dateFormat={'dd/MM/yyy'} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
