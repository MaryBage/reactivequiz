import React from 'react';

const NameField = (props) => {
    const text = props.informalText;

    return (
        <input type="text" id="name" value={text} className="commonstyle" />
    )
}

export default NameField;