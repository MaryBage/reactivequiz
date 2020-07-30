import React from "react"

const Logo = (props) => {
    const text = props.logoText; // "reactive", "hello", "compose", "create", "join", "tell"

    return (
        <div className="logo">{text}</div>
    )
}

export default Logo;