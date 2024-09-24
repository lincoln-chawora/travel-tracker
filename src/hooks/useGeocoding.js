import { useState, useEffect } from 'react';
import {convertToEmoji, GEOCODE_URL} from '../utils/util.js';

export function useGeocoding(lat, lng, cityID) {
    const [cityName, setCityName] = useState("");
    const [notes, setNotes] = useState("");
    const [date, setDate] = useState(new Date());
    const [country, setCountry] = useState("");
    const [emoji, setEmoji] = useState("");
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [geocodingError, setGeocodingError] = useState("");

    useEffect(() => {
        if ((!lat && !lng) || cityID) return;

        async function fetchCityData() {
            try {
                setGeocodingError("");
                setIsLoadingGeocoding(true);
                const response = await fetch(`${GEOCODE_URL}?latitude=${lat}&longitude=${lng}`);
                const data = await response.json();

                if (!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else.");

                setNotes('');
                setCityName(data.city || data.locality || "");
                setCountry(data.countryName);
                setEmoji(convertToEmoji(data.countryCode));
            } catch (error) {
                setGeocodingError(error.message);
            } finally {
                setIsLoadingGeocoding(false);
            }
        }

        fetchCityData();
    }, [lat, lng, cityID]);

    return { cityName, setCityName, notes, setNotes, date, setDate, country, emoji, isLoadingGeocoding, geocodingError };
}
