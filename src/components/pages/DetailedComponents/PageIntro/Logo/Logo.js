import React from "react";

const Logo = (props) => {
  const text = props.logoText;

  return <div className="logo">{text}</div>;
};

export default Logo;
