import React from "react";
import Button from '@material-ui/core/Button';

const ApproveButton = (props) => {
    const text = props.approveButtonText;

    return (
        <Button variant="outlined">
            {text}
        </Button>
    )
}

export default ApproveButton;