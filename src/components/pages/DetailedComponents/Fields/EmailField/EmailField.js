import React from 'react';

const EmailField = (props) => {
    const text = props.informalText;

    return (
        <input type="email" value={text} className="commonstyle" />
    )
}

export default EmailField;