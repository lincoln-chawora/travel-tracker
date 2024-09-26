import styles from "./CountryList.module.css"
import Spinner from "./Spinner";
import CountryItem from "./CountryItem.jsx";
import {useCitiesContext} from "../contexts/useCitiesContext";

export function CountryList() {
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