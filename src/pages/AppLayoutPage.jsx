import {Sidebar} from "../components/Sidebar";
import {Map} from "../components/Map";

import styles from "./AppLayout.module.css";

export function AppLayoutPage() {
    return (
        <div className={styles.app}>
            <Sidebar />
            <Map />
        </div>
    )
}