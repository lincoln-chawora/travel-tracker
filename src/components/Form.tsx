import React, {useEffect, useReducer} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useCitiesContext } from "../contexts/useCitiesContext.js";
import Button from "./Button.js";
import { BackButton } from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./Form.module.css";
import { createCity, updateCity } from "../services/apiCities.js";
import {formReducer} from "../reducers/formReducer.js";
import {useEditCityForm} from "../hooks/useEditCityForm";
import {useGeocoding} from "../hooks/useGeocoding";
import {getFormValues, initialFormState} from "../utils/util";

export function Form() {
    const [urlParams] = useSearchParams();
    const cityID = Number(urlParams.get('cityID'));
    const isEditForm = !!cityID;

    const [lat, lng] = useUrlPosition();
    const { dispatch, currentCity, isLoading } = useCitiesContext();
    const navigate = useNavigate();

    const [state, dispatchForm] = useReducer(formReducer, initialFormState);
    
    let { 
        cityName, 
        country,
        emoji,
        setCityName,
        notes,
        setNotes,
        date,
        setDate,
        isLoadingGeocoding,
        geocodingError 
    } = useGeocoding(lat!, lng!, cityID!);

    if (isEditForm) {
        ({ cityName, country, emoji, date } = state);
    }

    // Use custom hook for edit mode
    useEditCityForm(cityID, currentCity!, dispatchForm);

    useEffect(() => {
        if (isEditForm) {
            setNotes(state.notes)
        }
    }, [isEditForm, state.notes]);

    // Handle form submission
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Cast e.target to HTMLFormElement.
        const form = e.target as HTMLFormElement;
        const values = getFormValues(form);

        if (!values || !lat || !lng) return;

        const { cityName, notes, date: newDate, ...otherValues } = values;

        const date = new Date(newDate).toISOString();

        const cityData = {
            ...otherValues,
            cityName,
            notes,
            date,
            country,
            emoji,
            position: { lat, lng },
        };

        if (isEditForm && cityID) {
            await updateCity(cityID, cityData, dispatch);
        } else {
            await createCity(cityData, dispatch);
        }
        navigate('/app/cities');
    }

    if (isLoadingGeocoding || isLoading) return <Spinner />;
    if (geocodingError) return <Message message={geocodingError} />;
    if (!lng && !lat) return <Message message="Start by clicking somewhere on the map." />;

    return (
        <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
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
                <DatePicker
                    id="date"
                    onChange={(date) => setDate(date ? date.toISOString() : new Date().toISOString())}
                    selected={new Date(date)}
                    dateFormat={'MM/dd/yyyy'}
                />
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
                <Button type="primary">{isEditForm ? 'Update trip details' : 'Add'}</Button>
                <BackButton />
            </div>
        </form>
    );
}
