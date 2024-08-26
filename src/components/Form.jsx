import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useCitiesContext} from "../contexts/useCitiesContext.js";
import {Button} from "./Button";
import {BackButton} from "./BackButton";
import {useUrlPosition} from "../hooks/useUrlPosition.js";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import styles from "./Form.module.css";
import {convertToEmoji} from "../utils/util.js";

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

export function Form() {
    const [urlParams] = useSearchParams();
    const cityID = urlParams.get('cityID');

    // Get lat and lng from url when form loads.
    const [lat, lng] = useUrlPosition();
    const {createCity, updateCity, currentCity, isLoading} = useCitiesContext();
    const navigate = useNavigate()
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [emoji, setEmoji] = useState();
    const [geocodingError, setGeocodingError] = useState("");
    const [isEditForm, setIsEditForm] = useState(false);
    /*

        @todo: REFACTOR TO USE REDUCERS.

     */
    // When lat and lng update (as a result of click on map) fetch data (city, country ect) relating to that location.
    useEffect(() => {
        if (cityID) {
            setIsEditForm(true);
            setCityName(currentCity.cityName);
            setCountry(currentCity.country);
            setEmoji(currentCity.emoji);
            setNotes(currentCity.notes);
            setDate(currentCity.date);
        } else {
            setIsEditForm(false);
        }

        if ((!lat && !lng) || cityID) return;

        async function fetchCityData() {
            try {
                setGeocodingError("");
                setIsLoadingGeocoding(true);
                const response = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                const data = await response.json();

                if (!data.countryCode) throw new Error("That doesnt seem to be a city. Click somewhere else.");

                setNotes("");
                setDate(new Date());
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
    }, [lat, lng, cityID, currentCity]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!cityName || !date) return;

        const cityData = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: {lat, lng},
        };

        if (isEditForm && cityID) {
            await updateCity(cityID, cityData);
        } else {
            await createCity(cityData);
        }
        navigate('/app/cities');
    }

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

              <DatePicker id="date" onChange={date => setDate(date)} selected={date} dateFormat={'dd/MM/yyyy'} />
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
            <Button type='primary'>{isEditForm ? 'Update trip details' : 'Add'}</Button>
            <BackButton />
          </div>
        </form>
    );
}
