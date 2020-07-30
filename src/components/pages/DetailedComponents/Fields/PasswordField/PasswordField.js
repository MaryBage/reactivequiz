import React from "react";

const PasswordField = (props) => {
    const text = props.informalText;

    return (
        <input type="password" placeholder={text} value="" className="commonstyle" />
    )
}

export default PasswordField;