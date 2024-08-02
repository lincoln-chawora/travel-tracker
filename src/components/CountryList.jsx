import styles from "./CountryList.module.css"
import Spinner from "./Spinner.jsx";
import CountryItem from "./CountryItem.jsx";

export function CountryList({cities, isLoading}) {
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