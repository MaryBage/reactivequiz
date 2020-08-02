import React from "react";
import './_CustomSelect.css';

const CustomSelect = ({options, ...otherProps}) => {

    return (
        <select className="custom-select" {...otherProps}>
            <option>{otherProps.selectfieldtext}</option>
            <option value="js">Javascript</option>
        </select>
    )
}

export default CustomSelect;
