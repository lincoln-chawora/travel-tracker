import React from "react";
import styles from "./CountryItem.module.css";
import { Country } from "../reducers/data.modals";

interface CountryItemProps {
  country: Country
}
const CountryItem: React.FC<CountryItemProps> = ({ country }) => {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
