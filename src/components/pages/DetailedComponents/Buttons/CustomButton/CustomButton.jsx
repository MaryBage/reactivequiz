import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./_CustomButton.css";
import { CSSTransition } from "react-transition-group";

const useStyles = makeStyles({
  root: {
    position: "relative",
    marginTop: 48,
    color: "#555555",
    fontSize: 19,
    fontFamily: "Courier New",
    borderRadius: 5,
    backgroundColor: "white",
    textAlign: "center",
    outline: "none",
    textTransform: "lowercase",
    "&:hover": {
      backgroundColor: "#fbf7ff",
    },
  },
});

const CustomButton = ({ children, ...otherProps }) => {
  const [toggle, settoggle] = useState(true);
  const classes = useStyles();

  return (
    <>
      <CSSTransition in={toggle} timeout={500} classNames="rotate">
        {(state) => (
          <Button
            {...otherProps}
            classes={{
              root: classes.root,
            }}
            className={`${otherProps.linear ? "linear" : ""} ${
              otherProps.small ? `small ${state}` : ""
            }`}
            variant="outlined"
            color="primary"
            onClick={() => settoggle(!toggle)}
          >
            {children}
          </Button>
        )}
      </CSSTransition>
    </>
  );
};

export default CustomButton;
