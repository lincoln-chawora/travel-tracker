import styles from "./CountryList.module.css"
import Spinner from "./Spinner.js";
import CountryItem from "./CountryItem.js";
import {useCitiesContext} from "../contexts/useCitiesContext.js";
import React from "react";

export const CountryList: React.FC = () => {
    const {cities, isLoading} = useCitiesContext();

    if (isLoading) return <Spinner />;

    const countries = cities.filter((value, index, self) =>
        index === self.findIndex((c) => (
            c.country === value.country
        ))
    );

    return (
        <div className={styles.countryList}>
            {countries.map((city) => <CountryItem key={city.country} country={city} /> )}
        </div>
    )
}