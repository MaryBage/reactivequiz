import React from "react";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './_CustomButton.css';
import { Link } from 'react-router-dom'


const useStyles = makeStyles({
    root: {
        position: "relative",
        marginTop: 38,
        height: 45,
        color: "#555555",
        fontSize: 18,
        fontFamily: "Courier New",
        borderRadius: 5,
        backgroundColor: "white",
        textAlign: "center",
        outline: "none",
        textTransform: 'lowercase',
        padding: '0 45px',
    }
});

const CustomButton = ({ children, ...otherProps }) => {
    const classes = useStyles();

    return (
        <>
            <Button  {...otherProps} classes={{
                root: classes.root
            }} className={`${otherProps.linear ? "linear" : ""} ${otherProps.small ? "small" : ""}`} variant="outlined"
                color="primary">
                {children}
            </Button>
        </>
    )
}

export default CustomButton;