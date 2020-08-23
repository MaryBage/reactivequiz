import React from "react";
import s from "./CheckField.module.css";
import { Link } from "react-router-dom";

const CheckField = ({ ...props }) => {
  return (
    <div className={s.checkField}>
      <Link to="/reset_password" className={s.secondInnerCheckField}>
        forgot password?
      </Link>
    </div>
  );
};

export default CheckField;
