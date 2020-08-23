import React, { useEffect } from "react";
import "./_StartPage.css";
import { informativeButtonText } from "../../../StaticContent";
import image from "../../../images/pages/start.png";
import arrow from "../../../images/arrow/arrowup.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
import { Link } from "react-router-dom";

const StartPage = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="wrapper">
      <StaticImage image={image} i="0" anim="fromAbove" />
      <div className="changable-wrapper-custom fromBelow">
        <div className="innerWrapper">
          <div className="logo">reActive</div>
          <div className="arrow">
            <img src={arrow} alt="img" />
          </div>
          <div className="slogan">becoming reactive experts</div>
          <div className="buttons">
            <CustomButton component={Link} to="/about" linear="true">
              {informativeButtonText[0]}
            </CustomButton>
            <CustomButton component={Link} to="/start-test" linear="true">
              {informativeButtonText[1]}
            </CustomButton>
            <CustomButton component={Link} to="/signin" linear="true">
              {informativeButtonText[2]}
            </CustomButton>
            <CustomButton component={Link} to="/feedback" linear="true">
              {informativeButtonText[3]}
            </CustomButton>
          </div>
        </div>
        <footer>
          <small>&copy; Copyright 2020, Reactive</small>
        </footer>
      </div>
    </div>
  );
};

export default StartPage;
