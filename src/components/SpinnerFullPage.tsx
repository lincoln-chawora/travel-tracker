import React from "react";
import Spinner from "./Spinner";
import styles from "./SpinnerFullPage.module.css";

const SpinnerFullPage: React.FC = () => {
  return (
    <div className={styles.spinnerFullpage}>
      <Spinner />
    </div>
  );
}

export default SpinnerFullPage;
