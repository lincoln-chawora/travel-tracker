import { useEffect } from 'react';

export function useEditCityForm(cityID, currentCity, dispatchForm) {
    useEffect(() => {
        if (cityID && currentCity) {
            dispatchForm({
                type: "SET_FORM_DATA",
                payload: {
                    cityName: currentCity.cityName,
                    country: currentCity.country,
                    emoji: currentCity.emoji,
                    notes: currentCity.notes,
                    date: currentCity.date,
                },
            });
        }
    }, [cityID, currentCity]);
}
