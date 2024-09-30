import { City } from "../reducers/data.modals";

export const BASE_URL = 'http://localhost:9000/cities';
export const GEOCODE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

export const initialCityState = {
    cities: [],
    citiesSort: true,
    isLoading: false,
    currentCity: {},
    error: ''
}

export const initialFormState = {
    cityName: "",
    country: "",
    date: new Date().toISOString(),
    notes: "",
    emoji: "",
    geocodingError: "",
    isLoadingGeocoding: false,
};

export function convertToEmoji(countryCode: string) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

export const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));


export function getFormValues(array: HTMLFormElement): { [key: string]: string } {
    const formValues: { [key: string]: string } = {};
    
    Array.from(array.elements).forEach((input) => {
        if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
            if (input.id && input.value) {
                formValues[input.id] = input.value;
            }
        }
    });

    return formValues;
}

export function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message
	return String(error)
}

export function isEmptyObj(obj: object) {
    return Object.keys(obj).length === 0;
}

export const isCity = (city: any): city is City => {
    return city && typeof city === 'object' && 'cityName' in city;
};