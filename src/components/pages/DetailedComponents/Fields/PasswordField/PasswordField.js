import React from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            marginTop: "1px",
            width: '30ch',
        },
    },
}));

const PasswordField = (props) => {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                // error
                id="password"
                label="password" // "Incorrect password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
            />
        </form>
    )
}

export default PasswordField;