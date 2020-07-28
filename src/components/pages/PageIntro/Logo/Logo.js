import React from "react"

const Logo = (props) => {
    const text = props.logoText; // "reactive", "hello", "compose", "create", "join", "tell"

    return (
        <div className="logo">{text[3]}</div>
    )
}

export default Logo;