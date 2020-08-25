import React, { useState, useEffect } from "react";
import Countdown, { zeroPad } from "react-countdown";
import { PDFViewer } from "@react-pdf/renderer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import s from "./Popup.module.css";
import harder from "../../images/popups/harder.png";
import well from "../../images/popups/well.png";
import great from "../../images/popups/great.png";
import thanksmail from "../../images/popups/thanksmail.png";
import { popupText } from "../../StaticContent";
import ResultPdf from "../../components/pages/Pdf/Pdf";
import { updateQuizInfo } from "../../redux/quizInfo/quizInfo.actions";

const Popup = (props) => {
  const [width, setWidth] = useState({
    w: window.innerWidth,
    dif: window.outerWidth - window.innerWidth,
  });
  const images = [harder, well, great, thanksmail];
  const freePicUrl = [
    "https://stories.freepik.com/education",
    "https://stories.freepik.com/people",
    "https://stories.freepik.com/people",
    "https://stories.freepik.com/",
  ];

  const [openPdf, setOpenPdf] = useState({
    status: false,
    date: Date(Date.now()).slice(4, 24),
    ...props.quizInfo,
  });
  console.log('openPdf',openPdf.start,openPdf.duration )
  const [seeResults, setSeeResults] = useState(true)

  const total = props.res.map((e) => +e.total).reduce((total, e) => total + e);
  let result = props.res.map((e) => +e.point).reduce((total, e) => total + e);
  result = result > total ? Math.round(result) : +result.toPrecision(2);
  const coefficient = (result / total) * 100;
  const thanksmailText = "We greatly appreciate your feedback!";

  useEffect(() => {
    props.updateQuizInfo({
      duration: null,
      creator: null,
      start: null,
      quizId: null,
      quizName: null,
      userName: null,
      email: null,
    });
  }, []);

  useEffect(() => {
    const handleResize = () =>
      setWidth({
        w: window.innerWidth,
        dif: window.outerWidth - window.innerWidth,
      });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  let i;
  let text;
  if (coefficient < 60) {
    i = 0;
    text = popupText.harder;
  } else if (coefficient >= 60 && coefficient <= 80) {
    i = 1;
    text = popupText.well;
  } else if (coefficient > 80) {
    i = 2;
    text = popupText.great;
  } else {
    i = 3;
    text = popupText.thanksmail;
  }
  return (
    <>
      {openPdf.status ? (
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          <ResultPdf
            res={props.res}
            {...openPdf}
            score={`${result}/${total}`}
            percentage={coefficient}
          />
        </PDFViewer>
      ) : (
        <div className="popup-container">
          <div
            className={s.popupWrapper}
            style={
              width.w >= 800
                ? { minWidth: "800px", gridTemplateColumns: "repeat(2, 50%)" }
                : { minWidth: "400px", gridTemplateRows: "repeat(2, 50%)" }
            }
          >
            <div className="zoomIn">
              <img
                className={s.popupImg}
                src={images[i]}
                alt="img"
                useMap="#workmap"
              />
              <map name="workmap">
                <area
                  shape="rect"
                  coords="34,44,35,45"
                  alt="img"
                  href={freePicUrl[i]}
                />
              </map>
            </div>
            <div className={`${s.popupCommonWrapper} zoomOut`}>
              <h1>{text}</h1>
              {props.res.length ? (
                <h2>
                  Your score: <span>{result}</span> of <span>{total}</span>
                </h2>
              ) : (
                <h2>{thanksmailText}</h2>
              )}

              {/* <button
                        className={s.tryAgain}
                        value="try again"
                        key="tryAgain"
                        onClick={() => window.location.reload(false)}
                    >
                        try again!
                    </button> */}
               { openPdf.start && <> Your result will be available in <Countdown renderer={({hours, minutes, seconds}) => (
                                <span style={{color: '#000', marginLeft: 15, paddingBottom: 25}}>
                                        {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
                                        </span>
                                )}
                                    date={+openPdf.start+ openPdf.duration*60000} 
                                    onComplete = {()=> setSeeResults(false)}
                                    style={{color: '#000'}}/> </>}
              <button
                className={seeResults ? s.tryAgain : `${s.tryAgain} blink` }
                value="see results"
                key="seeresults"
                disabled = {openPdf.start && seeResults}
                onClick={() => setOpenPdf({ ...openPdf, status: true })}
              >
                see results
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateQuizInfo: (info) => dispatch(updateQuizInfo(info)),
});

export default withRouter(connect(null, mapDispatchToProps)(Popup));
