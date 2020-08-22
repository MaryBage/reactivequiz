import React from "react";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Link } from "react-router-dom";
import { approveButtonText } from "../../../StaticContent";
import s from "./PopupReset.module.css";
import InformativeField from "../../pages/DetailedComponents/Fields/InformativeField/InformativeField";
import CustomButton from "../../pages/DetailedComponents/Buttons/CustomButton/CustomButton";
import AfterResetPopup from "./AfterResetPopup/AfterResetPopup";
import axios from "../../../axios/axios-quiz";
import { Loader } from "../../pages/DetailedComponents/Loader/Loader";

class ResetPasswordPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      message: "",
      value: "",
      loader: false,
    };
  }

  onInputChange = (e) => {
    e.preventDefault();
    this.setState({
      value: e.target.value,
    });
  };

  onSubmitClick = (e) => {
    e.preventDefault();
    this.setState({
      loader: true,
    });

    axios
      .post(
        `/reset.php`,
        btoa(
          JSON.stringify({
            action: "reset",
            email: this.state.value,
          })
        )
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          status: res.data.status,
          message: res.data.message,
          loader: false,
        });
      });
  };

  render() {
    const { status, message, value, loader } = this.state;
    return (
      <>
        {loader ? (
          <Loader />
        ) : status ? (
          <AfterResetPopup />
        ) : (
          <div className="popup-container">
            <div className={s.resetWrapper}>
              <CustomButton small="true" component={Link} to="/signin">
                <KeyboardBackspaceIcon />
                back
              </CustomButton>
              <div className={s.popupWrapper}>
                <h1>Forgot your password?</h1>
                <h3>
                  Don’t worry, just enter your email address, and we will send
                  you a link to reset your password.
                </h3>
              </div>
              <form className={s.popupWrapper} onSubmit={this.onSubmitClick}>
                <p className="error-message">{!status ? message : ""}</p>
                <InformativeField
                  className={!status && message === "" ? "" : "incorrectInput"}
                  required
                  type="text"
                  id="reset"
                  name="reset"
                  placeholder="email"
                  value={value}
                  onChange={this.onInputChange}
                />
                <CustomButton type="submit" small="true" linear="true">
                  {approveButtonText[3]}
                </CustomButton>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default ResetPasswordPopup;
