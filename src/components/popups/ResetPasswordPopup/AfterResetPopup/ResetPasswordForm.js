import React, { useState } from "react";
import s from "./AfterResetPopup.module.css";
import c from "../../../pages/Admin/DetailedCompotents/ChangePsw.module.css";
import { useForm } from "react-hook-form";
import { withRouter } from "react-router-dom";
import axios from "../../../../axios/axios-quiz";

const ResetPasswordForm = (props) => {
  const { register, handleSubmit } = useForm();
  const [match, setMatch] = useState(false);
  const [success, setSuccess] = useState(false);

  const sbmtHandler = (data) => {
    if (!data.psw) {
      return;
    }
    if (data.psw !== data.confirmed) {
      setMatch(true);
    } else {
      axios
        .post(
          `/reset.php`,
          btoa(
            JSON.stringify({
              action: "change",
              newPsw: data.psw,
              creator: atob(props.match.params.detail),
            })
          )
        )
        .then((res) => setSuccess(res.data.success));
      setMatch(false);
    }
  };

  return (
    <div className="popup-container">
      <div className={s.afterResetWrapper}>
        <div className={s.afterResetTextWrapper}>
          <div className={c.changePassWrapper}>
            <div>
              <h1>Change password</h1>
            </div>
            <div style={{ height: 25, marginBottom: 15 }}>
              {match && (
                <span style={{ color: "red" }}>Passwords don't match</span>
              )}
              {success && (
                <span style={{ color: "green", fontWeight: "bold" }}>
                  Your password has been successfully changed!
                </span>
              )}
            </div>
            <div className={c.formContainer}>
              <form
                className={c.formWrapper}
                onSubmit={handleSubmit(sbmtHandler)}
              >
                <div className={c.inputWrapper}>
                  <div>new password</div>
                  <input type="password" ref={register} name="psw" />
                </div>
                <div className={c.inputWrapper}>
                  <div>retype new</div>
                  <input type="password" ref={register} name="confirmed" />
                </div>
                <div className={c.submitWrapper}>
                  <div></div>
                  <input
                    type="submit"
                    value="save changes"
                    className={c.changePswSubmit}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ResetPasswordForm);
