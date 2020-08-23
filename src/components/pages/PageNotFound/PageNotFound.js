import React from "react";
import s from "./PageNotFound.module.css";
import image from "../../../images/pages/PageNotFound.png";

const PageNotFound = (props) => {
  const url = image;

  return (
    <div>
      <div className={s.PageNotFoundCenterer}>
        <img src={url} alt="img" useMap="#workmap" />
        <map name="workmap">
          <area
            shape="rect"
            coords="34,44,35,45"
            alt="img"
            href="https://stories.freepik.com/web"
          />
        </map>
      </div>
    </div>
  );
};

export default PageNotFound;
