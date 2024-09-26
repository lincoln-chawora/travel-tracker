import React, { useEffect } from 'react';
import { City } from '../reducers/data.modals';
import { FORM_ACTION_TYPE } from '../reducers/formReducer';

export function useEditCityForm(cityID: number, currentCity: City | {}, dispatchForm: React.Dispatch<FORM_ACTION_TYPE>) {
    useEffect(() => {
        if (cityID && 'cityName' in currentCity) {
            dispatchForm({
                type: "form_data/create",
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
