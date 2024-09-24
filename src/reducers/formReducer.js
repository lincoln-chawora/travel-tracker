export function formReducer(state, action) {
    switch (action.type) {
        case "SET_FORM_DATA":
            return { ...state, ...action.payload };
        case "SET_ERROR":
            return { ...state, geocodingError: action.error, isLoadingGeocoding: false };
        case "loading":
            return {
                ...state,
                isLoadingGeocoding: true
            };
        default:
            return state;
    }
}