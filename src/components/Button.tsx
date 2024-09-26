import styles from "./Button.module.css"
import React, {MouseEventHandler, ReactNode} from "react";

interface ButtonProps {
    readonly children: ReactNode;
    readonly type: string;
    readonly onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({children, onClick, type}) => {
    return (
        <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>{children}</button>
    )
}

export default Button;