import React from "react";

const ApproveButton = (props) => {
    const text = props.approveButtonText;

    return (
        <button type="submit" value={text} className="commonstyle">{text}</button>
    )
}

export default ApproveButton;