import React from "react";
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import './_CustomButton.css';
import {Link} from 'react-router-dom'


const useStyles = makeStyles({
    root: {
        position: "relative",
        marginTop: 50,
        padding: '0 45px',
        borderColor: 'grey',
        color: 'black',
        borderRadius: 13,
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        height: 48,
        // boxShadow: '0 3px 5px 2px rgba(184, 85, 168, .3)',
        // border: 'none',
        textTransform: 'lowercase',
        fontSize: 18,
        letterSpacing: 2,
    }
});

const Buttons = ({children, ...otherProps}) => {
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
};
export default Buttons