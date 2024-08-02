import styles from "./Button.module.css"
export function Button({children, onClick, type}) {
    return (
        <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>{children}</button>
    )
}