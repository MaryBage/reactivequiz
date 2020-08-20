import React, { useContext, useState} from 'react';
import s from "./AnswersAndCode.module.css";
import { DbContext } from "../context/database/dbContext";


const AnswersAndCode = ({id, dbid, questions}) => {

    const { updateData, deleteData } = useContext(DbContext);
    const answers = questions[id - 1].options;
    const [disappear, setDisappear] = useState({ disappear : false, index : null });
    const [hint, setHint] = useState({hint : false, index : null});

    const makeToDisappear = (e, id) => {
        setDisappear({
        ...disappear,
        disappear : true,
        index : id
        })
    }
    
    const makeToShowHint = (e, id) => {
        setHint(
          {
            ...hint,
            hint : true,
            index : id
          }
        )
    }

    const codeEdit = (e, id, table) => {
        if(e.target.value) {
            updateData(id, table, e.target.name, e.target.value);
        }
    }

    const editAnswer = (e, table) => {
        console.log(e.target.id, table, e.target.name, e.target.value)
        if(e.target.value) {
            updateData(e.target.id, table, e.target.name, e.target.value);
        }
    }

    return (
        <>  
            { questions[id - 1].code &&
                <div className={s.codeWrapper}>
                    <textarea 
                        cols='50' rows='4'
                        name="code"
                        placeholder={questions[id - 1].code} 
                        onBlur={(e) => codeEdit(e, dbid, "questions")}
                    />
                    <div className="pointer red" onClick={() => deleteData(dbid)}>&#10008;</div>
                </div>
            }
            {answers.map(answer => (
                    <div className={s.answer} key={Object.keys(answer)[0]}>
                        <div 
                            name
                            className={Object.keys(answer)[0] == disappear.index ? s.disappeared : s.appeared && 
                                Object.values(answer)[0][0] == "right" ? s.appearedTrue : s.appeared} 
                            onDoubleClick={(e) => makeToDisappear(e, Object.keys(answer)[0])}
                            onMouseOver={(e) => makeToShowHint(e, Object.keys(answer)[0])}
                            onMouseOut={() => makeToShowHint(false)}
                        >
                            {Object.values(answer)[0][1]}
                            {hint && hint.index == Object.keys(answer)[0] ? 
                                <div className={s.hint}>Double-click and edit the question!</div> : null}
                        </div>
                        { disappear.disappear && Object.keys(answer)[0] == disappear.index &&
                        <input 
                            type="text" 
                            name="answer"
                            id={Object.keys(answer)[0]}
                            placeholder={Object.values(answer)[0][1]}
                            onBlur={(e) => editAnswer(e, "answers")}
                        />}
                        <div className="pointer red" onClick={() => deleteData(Object.keys(answer)[0])}>&#10008;</div>
                </div>))
            }
        </>
    )
}

export default AnswersAndCode;