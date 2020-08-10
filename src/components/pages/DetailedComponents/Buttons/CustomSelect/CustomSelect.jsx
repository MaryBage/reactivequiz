import React from "react";
import './_CustomSelect.css';

const CustomSelect = ({options, ...otherProps}) => {

    const createSelectItems = (options) => {
        
        let items = [];
        items.push(<option value="" key={otherProps.name}>select {otherProps.name}</option>);

        for (let key in options) {
            items.push(<option key={key} value={key} disabled = {(otherProps.name == 'category') && key !== 'JavaScript'}>{options[key]}</option>)
        }
        return items;
    };
    
    return (
        <select className="custom-select" {...otherProps}>
            {createSelectItems(options)}
        </select>
    )
}

export default CustomSelect;
