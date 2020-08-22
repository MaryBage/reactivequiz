import React, { useState, useEffect } from "react";
import {
  logoText,
  sloganText,
  approveButtonText,
} from "../../../StaticContent";
import image from "../../../images/pages/signup.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import InformativeField from "../DetailedComponents/Fields/InformativeField/InformativeField";
import SimpleLine from "../DetailedComponents/SimpleLine/SimpleLine";
import { setCurrentUser } from "../../../redux/user/user.actions";
import { connect } from "react-redux";
import axios from "axios";
import { Loader } from "../DetailedComponents/Loader/Loader";
import DelayLink from "react-delay-link";

const SignUp = ({ setCurrentUser }) => {
  const [data, setData] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({ error: "" });
  const [loader, setLoader] = useState({ loader: false });

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const oniInputChange = (e) => {
    const { name } = e.target;
    setData({ ...data, [name]: e.target.value });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoader({ loader: true });
    const params = {
      ...data,
      action: "signUp",
    };
    axios
      .post(
        `https://cors-anywhere.herokuapp.com/https://reactivequiz.com/api/auth.php`,
        btoa(JSON.stringify(params))
      )
      .then((res) => {
        if (res.data.message) {
          if (res.data.message.includes("Integrity constraint violation")) {
            setError({ error: "Email must be unique" });
          }
        } else {
          setCurrentUser(res.data);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoader({ loader: false }));
  };

  return (
    <>
      {(loader.loader && <Loader />) || (
        <div className="wrapper">
          <StaticImage image={image} anim="fromBelow" />
          <div className="changable-wrapper fromAbove">
            <DelayLink delay={700} to={"/"}>
              <CustomButton small="true">
                <KeyboardBackspaceIcon />
                back
              </CustomButton>
            </DelayLink>
            <PageIntro logoText={logoText[3]} sloganText={sloganText[3]} />
            <form onSubmit={handleRegister} className="informativeDivision">
              <p className="error-message">{error.error}</p>
              <InformativeField
                onChange={oniInputChange}
                type="text"
                id="signup"
                name="displayName"
                placeholder="name"
                value={data.displayName}
                required
              />
              <SimpleLine />
              <InformativeField
                className={error.error ? "incorrectInput" : ""}
                onChange={oniInputChange}
                type="text"
                id="signup-email"
                name="email"
                placeholder="email"
                value={data.email}
                required
              />
              <SimpleLine />
              <InformativeField
                onChange={oniInputChange}
                type="password"
                id="signup-password"
                name="password"
                placeholder="password"
                value={data.password}
                required
              />
              <CustomButton type="submit" linear="true">
                {approveButtonText[1]}
              </CustomButton>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (data) => dispatch(setCurrentUser(data)),
});

export default connect(null, mapDispatchToProps)(SignUp);
