import styles from './Sidebar.module.css'
import Logo from "./Logo.jsx";
import {AppNav} from "./AppNav";
import {Outlet} from "react-router-dom";
export function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />

            {/* This is used to render child route elements like {children} */}
            <Outlet />

            <footer className={styles.footer}>
                <p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} by Lincoln Chawora</p>
            </footer>
        </div>
    )
}