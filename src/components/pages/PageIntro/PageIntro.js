import React from "react"
import Logo from "./Logo/Logo"
import Slogan from "./Slogan/Slogan"

const PageIntro = (props) => {
    const logoText = props.sloganAndLogo.logoText;
    const sloganText = props.sloganAndLogo.sloganText;

    return (
    <div className="page-intro">
        <Logo logoText={logoText} />
        <Slogan sloganText={sloganText} />
    </div>
    )
}

export default PageIntro;