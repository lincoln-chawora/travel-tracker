import { FormData } from "./data.modals";

type FormState = {
    cityName: string;
    country: string;
    date: string;
    notes: string;
    emoji: string;
    geocodingError: string;
    isLoadingGeocoding: boolean;
}

export type FORM_ACTION_TYPE =
    | { type: "form_data/create"; payload: FormData }
    | { type: "loading" }
    | { type: "rejected"; payload: string }

export const formReducer = (state: FormState, action: FORM_ACTION_TYPE): FormState => {
    switch (action.type) {
        case "form_data/create":
            return { 
                ...state, 
                ...action.payload,
                isLoadingGeocoding: false
            };
        case "rejected":
            return { 
                ...state,
                geocodingError: action.payload, 
                isLoadingGeocoding: false 
            };
        case "loading":
            return {
                ...state,
                isLoadingGeocoding: true
            };
        default:
            return state;
    }
}