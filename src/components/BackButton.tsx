import React from "react";
import Button from "./Button";
import {useNavigate} from "react-router-dom";

export const BackButton: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Button type="back" onClick={(e) => {
            e.preventDefault();
            // Go back to previous page.
            navigate(-1);
        }}>&larr; Back</Button>
    )
}