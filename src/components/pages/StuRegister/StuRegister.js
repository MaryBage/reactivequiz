import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {withRouter, useHistory} from "react-router-dom";
import axios from '../../../axios/axios-quiz';
import image from "../../../images/pages/studentRegister.png";
import StaticImage from "../DetailedComponents/StaticImage/StaticImage";
import CustomButton from "../DetailedComponents/Buttons/CustomButton/CustomButton";
import PageIntro from "../DetailedComponents/PageIntro/PageIntro";
import InformativeField from "../DetailedComponents/Fields/InformativeField/InformativeField";
import SimpleLine from "../DetailedComponents/SimpleLine/SimpleLine";
import { updateQuizInfo } from "../../../redux/quizInfo/quizInfo.actions";
import {Loader} from '../DetailedComponents/Loader/Loader';

const StuRegister = (props) => {
  const [ locationKeys, setLocationKeys ] = useState([])
  const history = useHistory()
  const [data, setData] = useState({ displayName: "", email: "" });
  const oniInputChange = (e) => {
    const { name } = e.target;
    setData({ ...data, [name]: e.target.value });
  };
  const [quizInfo, setQuizInfo] = useState({
                                    duration: '',
                                    quizId: '',
                                    quizName: '',
                                    creator: ''})
  const [loader, setLoader] = useState(true);
     

  useEffect(() => {
    document.body.style.overflow = "hidden";
      if(props.match.params.detail){
        axios
        .post(`/quiz.php`, atob(props.match.params.detail))
        .then(res => {
             if (res.data.message) {
               history.push('/unavailable/')
                setLoader(false)
            }
            else {
              setQuizInfo({...quizInfo, ...res.data});
              setLoader(false)
            }
        })
      }
      else setLoader(false);

      window.addEventListener('popstate',onBackButtonEvent);

      return window.removeEventListener('popstate',onBackButtonEvent);
  }, []);

  

 const onBackButtonEvent = (e) => {
    e.preventDefault();
    console.log('onBackButtonEvent')
     history.push('http://localhost:3000/');
}


  const handleRegister = async (e) => {
    e.preventDefault();
    props.updateQuizInfo({
      duration: quizInfo.duration,
      quizName: quizInfo.quizName,
      quizId: quizInfo.quizId,
      creator: quizInfo.creator,
      userName: data.displayName,
      email: data.email,
      start: Date.now(),
    });
    props.history.push({
      pathname: `/quiz/${props.match.params.detail}`,
    });
  };
  return (
    <>
    {(loader && <Loader/>) ||
      <div className="wrapper">
        <StaticImage image={image} i="6" anim="fromBelow" />
        <div className="changable-wrapper fromAbove">
          <div style={{ marginTop: 150 }}>
            <PageIntro
              logoText="are you ready?"
              sloganText="fill out the fields, do your best"
            />
          </div>
          <form onSubmit={handleRegister} className="informativeDivision">
            <InformativeField
              onChange={oniInputChange}
              type="text"
              id="signup"
              name="displayName"
              placeholder="name"
              value={data.displayName}
              required
            />
            <SimpleLine />
            <InformativeField
              className={false ? "incorrectInput" : ""}
              onChange={oniInputChange}
              type="text"
              id="signup-email"
              name="email"
              placeholder="email"
              value={data.email}
              required
            />
            <CustomButton type="submit" linear="true">
              Start
            </CustomButton>
          </form>
        </div>
      </div>}
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateQuizInfo: (info) => dispatch(updateQuizInfo(info)),
});

export default withRouter(connect(null, mapDispatchToProps)(StuRegister));
