import styles from "./Button.module.css"
import {Button} from "./Button.jsx";
import {useNavigate} from "react-router-dom";

export function BackButton() {
    const navigate = useNavigate();
    return (
        <Button type='back' className={`${styles.btn} ${styles['back']}`} onClick={(e) => {
            e.preventDefault();
            // Go back to previous page.
            navigate(-1);
        }}>&larr; Back</Button>
    )
}