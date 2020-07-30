import React from "react";
import s from "./PageIntro.module.css";
import Logo from "./Logo/Logo";
import Slogan from "./Slogan/Slogan";

const PageIntro = (props) => {
    const logoText = props.logoText;
    const sloganText = props.sloganText;

    return (
        <div className={s.pageIntro}>
            <Logo logoText={logoText} />
            <Slogan sloganText={sloganText} />
        </div>
    )
}

export default PageIntro;