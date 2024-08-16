export function cityReducer(state, action) {
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                isLoading: true
            }
        case 'cities/loaded':
            return {
                ...state,
                cities: action.payload,
                isLoading: false
            }
        case 'city/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload]
            }
        case 'city/updated':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.map(city =>
                    city.id === action.payload.id ? action.payload : city
                ),
                currentCity: action.payload
            }
        case 'city/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter((city) => city.id !== action.payload),
                currentCity: {}
            }
        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload
            }
        case 'rejected':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            throw new Error('Invalid action')
    }
}