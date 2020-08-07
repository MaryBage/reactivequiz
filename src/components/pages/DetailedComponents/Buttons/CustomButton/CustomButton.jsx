import React,{useState} from "react";
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import './_CustomButton.css';
import {Transition,CSSTransition} from "react-transition-group";


const useStyles = makeStyles({
    root: {
        position: "relative",
        marginTop: 43,
        color: "#555555",
        fontSize: 19,
        fontFamily: "Courier New",
        borderRadius: 5,
        backgroundColor: "white",
        textAlign: "center",
        outline: "none",
        textTransform: 'lowercase',
    }
});

const CustomButton = ({children, ...otherProps}) => {
    const [toggle,settoggle]=useState(true)
    const classes = useStyles();
    const currentUrl = otherProps.url;

    return (
       
     <> 
    <Button {...otherProps} classes={{
    root: classes.root
      }} className={`${otherProps.linear ? "linear" : ""} ${otherProps.small ? "small" : ""} rotateBtn`} variant="outlined"
      color="primary" onClick={()=>settoggle(!toggle)}  >
       
     
       {children}
       
    </Button>    
    <CSSTransition
        in={toggle}
        timeout={1}
        classNames="sm"
        unmountOnExit
        onEnter={() => settoggle(true)}
       
      >
        
        {<Button onClick={()=>settoggle(toggle)} ></Button>} 
      
      </CSSTransition>
    </> 
 
              
       
    )
}

export default CustomButton;