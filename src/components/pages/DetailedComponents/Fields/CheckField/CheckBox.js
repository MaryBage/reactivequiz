import React from "react";
import Checkbox from '@material-ui/core/Checkbox';

const CheckBox = (props) => {
    return (
        <div>
            <Checkbox
                color="default"
                inputProps={{ 'aria-label': 'checkbox with default color' }}
            />
        </div>
    )
}

export default CheckBox;