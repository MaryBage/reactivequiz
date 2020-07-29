import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            width: '30ch',
        },
    },
}));

const InformalField = (props) => {
    const text = props.informalText;
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                // error
                id="email"
                label={text} // "Incorrect email"
                variant="outlined"
            />
        </form>
    )
}

export default InformalField;