import React, { useEffect, useContext, useState } from "react";
import "./Admin.css";
import axios from "../../../axios/axios-quiz";
import { UserContext } from "./context/user/userContext";
import Modal from "react-modal";
import { PDFViewer } from "@react-pdf/renderer";
import ResultPdf from "../../pages/Pdf/Pdf";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { fetchCollectionStartAsync } from "../../../redux/student/student.actions";
import { connect } from "react-redux";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 15,
    border: "none",
    boxShadow: "5px 5px 25px rgba(0,0,0,.5)",
  },
};

const StuResults = ({ students, getStudents }) => {
  const { id } = useContext(UserContext);
  // const {getStudents, students} = useContext(DbContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [res, setRes] = useState({ res: [] });
  const [changedStudents, setChangedStudents] = useState([]);
  const [searchBy, setSearchBy] = useState("quizName");
  const [orderingName, setOrderingName] = useState(false);
  const [orderingQuizName, setOrderingQuizName] = useState(false);
  const [orderingEmail, setOrderingEmail] = useState(false);
  const [orderingPercentage, setOrderingPercentage] = useState(false);

  console.log(students);
  useEffect(() => {
    getStudents(id);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setChangedStudents(students);
  }, [students]);

  const openPdf = (_, props) => {
    axios
      .post(`/calcResult.php`, btoa(JSON.stringify({ ...props, pdf: true })))
      .then((res) => {
        setRes({ res: res.data, ...props });
        setIsOpen(true);
      });
  };

  const sortingBy = (e, field) => {
    function compare(a, b, field, order = 1) {
      // Use toUpperCase() to ignore character casing
      const fldA = a[field].toUpperCase();
      const fldB = b[field].toUpperCase();

      let comparison = 0;
      if (fldA > fldB) {
        comparison = 1;
      } else if (fldA < fldB) {
        comparison = -1;
      }
      return comparison * order;
    }
    switch (field) {
      case "name":
        setOrderingName(!orderingName);
        setChangedStudents(
          orderingName
            ? changedStudents.sort((a, b) => compare(a, b, field, -1))
            : changedStudents.sort((a, b) => compare(a, b, field))
        );
        break;
      case "email":
        setOrderingEmail(!orderingEmail);
        setChangedStudents(
          orderingEmail
            ? changedStudents.sort((a, b) => compare(a, b, field, -1))
            : changedStudents.sort((a, b) => compare(a, b, field))
        );
        break;
      case "quizName":
        setOrderingQuizName(!orderingQuizName);
        setChangedStudents(
          orderingQuizName
            ? changedStudents.sort((a, b) => compare(a, b, field, -1))
            : changedStudents.sort((a, b) => compare(a, b, field))
        );
        break;
      case "percentage":
        setOrderingPercentage(!orderingPercentage);
        setChangedStudents(
          changedStudents.sort((a, b) =>
            orderingPercentage ? a[field] - b[field] : b[field] - a[field]
          )
        );
        break;
    }
  };

  const searchHandler = (e) => {
    if (e.target.value)
      setChangedStudents(
        changedStudents.filter((el) => el[searchBy].toLowerCase().includes(e.target.value.toLowerCase()))
      );
    else setChangedStudents(students);
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Pdf report"
        style={{ width: "30%!important" }}
      >
        <div
          className="pointer red"
          style={{ marginLeft: 20, marginBottom: 10 }}
          onClick={() => setIsOpen(false)}
        >
          &#10008;
        </div>
        <PDFViewer style={{ width: "100%", height: "100vh" }}>
          <ResultPdf {...res} />
        </PDFViewer>
      </Modal>
      {students.length ? (
        <>
          <div className="quizesWrapper">
            <input
              type="text"
              name="quiz"
              className="searchField"
              onInput={searchHandler}
              placeholder="search..."
            />
            &nbsp;&nbsp; by &nbsp;&nbsp;
            <select onChange={(e) => setSearchBy(e.target.value)}>
              <option value="quizName">Quiz</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
            </select>
            <hr style={{ margin: "25px 0px" }} />
            <div className="quizesTableDiv">
              <table className="quizTable">
                <tbody>
                  <tr key="quizHeader">
                    <th>#</th>
                    <th>
                      <div
                        className="sorting"
                        name="questionsLength"
                        onDoubleClick={(e) => sortingBy(e, "quizName")}
                      >
                        Quiz
                        {!orderingQuizName && <ArrowDropUpIcon />}
                        {orderingQuizName && <ArrowDropDownIcon />}
                      </div>
                    </th>
                    <th>
                      <div
                        className="sorting"
                        name="questionsLength"
                        onDoubleClick={(e) => sortingBy(e, "name")}
                      >
                        Name
                        {!orderingName && <ArrowDropUpIcon />}
                        {orderingName && <ArrowDropDownIcon />}
                      </div>
                    </th>
                    <th>
                      <div
                        className="sorting"
                        name="questionsLength"
                        onDoubleClick={(e) => sortingBy(e, "email")}
                      >
                        Email
                        {!orderingEmail && <ArrowDropUpIcon />}
                        {orderingEmail && <ArrowDropDownIcon />}
                      </div>
                    </th>
                    <th>
                      <div
                        className="sorting"
                        name="questionsLength"
                        onDoubleClick={(e) => sortingBy(e, "percentage")}
                      >
                        Result
                        {!orderingPercentage && <ArrowDropUpIcon />}
                        {orderingPercentage && <ArrowDropDownIcon />}
                      </div>
                    </th>
                    <th>Pdf</th>
                  </tr>

                  {changedStudents.map((student, i) => (
                    <tr key={`1${i}`}>
                      <td>{i + 1}</td>
                      <td>{student.quizName}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>
                        <div onDoubleClick={(e) => sortingBy(e, "percentage")}>
                          {student.score} ({student.percentage}%)
                        </div>
                      </td>
                      <td>
                        <button
                          className="getLinkBtn"
                          onClick={(e) =>
                            openPdf(e, {
                              email: student.email,
                              userName: student.name,
                              quiz_json: student.result_json,
                              quizId: student.quizId,
                              result: student.result,
                              quizName: student.quizName,
                              date: student.date,
                              score: student.score,
                              percentage: student.percentage,
                              creator: id,
                            })
                          }
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  ))}

                  <tr key="quizHeader2">
                    <td colSpan="7">
                      {/* <div className='tablePaging'>
                            <div> show per page&nbsp;
                                <select onChange={onRowperpageChange}>
                                    <option value='5'>5</option>
                                    <option value='10'>10</option>
                                    <option value='15'>15</option>
                                </select>
                            </div>

                            <div>
                                <ArrowLeft onClick={back}/>
                                <ArrowRight onClick={next}/>
                            </div>
                            {page + 1}-{rowperpage + page > quizes.length ? quizes.length : rowperpage + page} from {quizes.length}
                        </div> */}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        "There are no students yet."
      )}
    </>
  );
};
const mapDispatchToProps = (dispatch) => ({
  getStudents: (id) => dispatch(fetchCollectionStartAsync(id)),
});
const mapStateToProps = (state) => ({
  students: state.students.students,
});

export default connect(mapStateToProps, mapDispatchToProps)(StuResults);
