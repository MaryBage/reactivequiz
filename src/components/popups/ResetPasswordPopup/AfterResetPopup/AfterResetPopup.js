import React from "react";
import s from "./AfterResetPopup.module.css";
import CustomButton from "../../../pages/DetailedComponents/Buttons/CustomButton/CustomButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import DelayLink from "react-delay-link";

const AfterResetPopup = (props) => {
  return (
    <div className="popup-container">
      <div className={s.afterResetWrapper}>
        <div className={s.afterResetTextWrapper}>
          <h1>Success!</h1>
          <h3>
            Password reset request was sent successfully.<br></br>
            Please check your email to reset your password.
          </h3>
          <DelayLink delay={700} to={"/signin"}>
            <CustomButton small="true">
              <KeyboardBackspaceIcon />
              back
            </CustomButton>
          </DelayLink>
        </div>
      </div>
    </div>
  );
};

export default AfterResetPopup;
