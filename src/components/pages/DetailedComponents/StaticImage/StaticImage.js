import React from "react";

const StaticImage = (props) => {
  const url = props.image;
  const index = props.i;
  const freePicUrl = [
    "https://stories.freepik.com/business",
    "https://stories.freepik.com/people",
    "https://stories.freepik.com/work",
    "https://stories.freepik.com/web",
    "https://stories.freepik.com/people",
    "https://stories.freepik.com/online",
    "https://stories.freepik.com/people",
  ];

  return (
    <div className={`static-wrapper ${props.anim}`}>
      <img className="img" src={url} alt="img" useMap="#workmap" />
      <map name="workmap">
        <area
          shape="rect"
          coords="34,44,35,45"
          alt="img"
          href={freePicUrl[index]}
          target="_blank"
        />
      </map>
    </div>
  );
};

export default StaticImage;
