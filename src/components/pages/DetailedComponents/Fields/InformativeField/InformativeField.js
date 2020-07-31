import React from 'react';

const InformativeField = (props) => {
    const type = props.fieldType;
    const id = `${props.fieldId}${type}`;
    const text = props.informativeText;
    
    return (
        <input type={type} id={id} name={id} placeholder={text} value="" className="commonstyle" />
    )
}

export default InformativeField;