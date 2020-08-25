import React, { useContext, useState, useEffect } from "react";
import s from "./AnswersAndCode.module.css";
import "../Admin.css";
import { DbContext } from "../context/database/dbContext";

const AnswersAndCode = ({ id, dbid, questions }) => {
  const { updateData, deleteData } = useContext(DbContext);
  const [disappear, setDisappear] = useState({ disappear: false, index: null });
  const [hint, setHint] = useState({ hint: false, index: null });
  const [details, setDetails] = useState(questions[id - 1]);

  useEffect(() => {
    if(questions.length > 0)
      setDetails(questions[id - 1])
   },   [questions,id] )
   
  const makeToDisappear = (e, id) => {
    setDisappear({
      ...disappear,
      disappear: true,
      index: id,
    });
  };

  const makeToShowHint = (e, id) => {
    setHint({
      ...hint,
      hint: true,
      index: id,
    });
  };

  const codeEditHandler = (e) => {
    if (e.target.value) {
      updateData(e.target.id, "questions", e.target.name, e.target.value);
    }
  };

  const editAnswer = (e, table) => {
    if (e.target.value) {
      updateData(e.target.id, table, e.target.name, e.target.value);
      setDisappear({
        ...disappear,
        disappear: false,
        index: e.target.id,
      });
    }
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      editAnswer(e, "answers");
      e.target.blur();
    }
  };

  return (
    <>
      {details.code && (
        <div className={s.codeWrapper}>
          <textarea
            cols="50"
            rows={questions[id - 1].code.split("\n").length}
            name="code"
            id={dbid}
            value={details.code}
            onBlur={codeEditHandler}
            onChange={(e) => setDetails({ ...details, code: e.target.value })}
          />
          <div className="pointer red" onClick={() => updateData(dbid, "questions", 'code', '')}>
            &#10008;
          </div>
          <hr />
        </div>
      )}

      {Object.entries(details.options).map((answer) => {
        return (
          <div className={s.answer} key={`1${answer[0]}`}>
            {
              <div
                name
                className={
                  answer[0] === disappear.index && disappear.disappear
                    ? s.disappeared
                    : s.appeared && answer[1].type === "right"
                    ? s.appearedTrue
                    : s.appeared
                }
                onDoubleClick={(e) => makeToDisappear(e, answer[0])}
                onMouseOver={(e) => makeToShowHint(e, answer[0])}
                onMouseOut={() => makeToShowHint(false)}
              >
                {answer[1].answer}
                {hint && hint.index === answer[0] ? (
                  <div className={s.hint}>Double-click to edit the answer!</div>
                ) : null}
              </div>
              /* {+answer[1].point>0 &&  <div>{answer[1].point}</div>} </> */
            }
            {disappear.disappear && answer[0] === disappear.index && (
              <>
                <input
                  className={
                    answer[1].type === "right" ? s.appearedTrue : s.appeared
                  }
                  type="text"
                  name="answer"
                  id={answer[0]}
                  value={answer[1].answer}
                  onMouseOver={(e) => makeToShowHint(e, answer[0])}
                  onMouseOut={() => makeToShowHint(false)}
                  onKeyPress={keyPressHandler}
                  onChange={(e) =>
                    setDetails({
                      ...details,
                      options: {
                        ...details.options,
                        [answer[0]]: {
                          ...details.options[answer[0]],
                          answer: e.target.value,
                        },
                      },
                    })
                  }
                />
              </>
            )}
            {(Object.keys(details.options).length > 2 && answer[1].type !== "right") && <div className="pointer red" onClick={() => deleteData(answer[0],'answer')}>&#10008;</div>}
            </div>
           
            )})}

        </>
    )
}

export default AnswersAndCode;
