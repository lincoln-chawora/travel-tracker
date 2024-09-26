import { useState, useEffect } from 'react';
import {convertToEmoji, GEOCODE_URL, getErrorMessage} from '../utils/util';

export function useGeocoding(lat: string, lng: string, cityID: number) {
    const [cityName, setCityName] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
    const [date, setDate] = useState<string>(new Date().toDateString());
    const [country, setCountry] = useState<string>("");
    const [emoji, setEmoji] = useState<string>("");
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false);
    const [geocodingError, setGeocodingError] = useState<string>("");

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
                setGeocodingError(getErrorMessage(error));
            } finally {
                setIsLoadingGeocoding(false);
            }
        }

        fetchCityData();
    }, [lat, lng, cityID]);

    return { cityName, setCityName, notes, setNotes, date, setDate, country, emoji, isLoadingGeocoding, geocodingError };
}
