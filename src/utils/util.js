export const BASE_URL = 'http://localhost:9000/cities';
export const GEOCODE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

export const initialCityState = {
    cities: [],
    citiesSort: true,
    isLoading: false,
    currentCity: {},
    error: ''
}

// Initial state for form data
export const initialFormState = {
    cityName: "",
    country: "",
    date: new Date(),
    notes: "",
    emoji: "",
    geocodingError: "",
    isLoadingGeocoding: false,
};

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

export const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

export function getFormValues(array) {
    const formValues = {}
    Array.from(array).forEach((input) => {
        if (input.value) {
            formValues[input.id] = input.value
        }
    });

    return formValues;
}