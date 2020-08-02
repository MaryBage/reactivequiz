import React from "react";
import './_CustomSelect.css';

const CustomSelect = ({options, ...otherProps}) => {

    const createSelectItems = (options) => {
        let items = [];
        items.push(<option value="" key={otherProps.name}>{otherProps.name}</option>);
        for (let key in options) {
            items.push(<option key={key} value={key}>{options[key]}</option>)
        }
        return items;
    };
    return (
        <select className="custom-select" {...otherProps}>
            <option>{otherProps.selectfieldtext}</option>
            <option value="js">Javascript</option>
        </select>
    )
}

export default CustomSelect;
