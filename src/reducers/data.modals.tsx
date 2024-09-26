export interface City {
    id?: number;
    cityName: string;
    country: string;
    emoji: string;
    date: string;
    notes: string;
    position: {lat: string, lng: string};
}

export interface FormData {
    cityName: string;
    country: string;
    emoji: string;
    date: string;
    notes: string;
}

export interface Country {
    country: string;
    emoji: string;
}
