import React, { useEffect } from "react";
import { logoText, sloganText } from "../../../StaticContent";
import s from "./About.module.css";
import image from "../../../images/pages/welcome.png";
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import DelayLink from "react-delay-link";

const About = (props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="wrapper">
      <StaticImage image={image} i="1" anim="fromLeft" />
      <div className="changable-wrapper fromRight">
        <DelayLink delay={700} to="/">
          <CustomButton small="true">
            <KeyboardBackspaceIcon />
            back
          </CustomButton>
        </DelayLink>
        <PageIntro logoText={logoText[0]} sloganText={sloganText[0]} />
        <div className={s.content}>
          This environment was created to motivate an enthusiastic, active,
          curios people, who never stop going forward and developing own skills.
          Also, this platform aims to gather the people, who want to share own
          experience or direct the others to become reactive experts climbing
          higher and higher up to their learning “mountain”.
          <br></br>
          <br></br>
          <span>So, the best of luck to you on your way to the top!</span>
        </div>
      </div>
    </div>
  );
};

export default About;
