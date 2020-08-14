import React, { useContext, useEffect} from 'react';
import s from "./AnswersAndCode.module.css";
import { DbContext } from "../context/database/dbContext";


const AnswersAndCode = ({id, dbid, questions}) => {

    const { updateData, deleteData } = useContext(DbContext);
    const answers = questions[id - 1].options;

    console.log(questions)

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
                        name="code"
                        placeholder={questions[id - 1].code} 
                        onBlur={(e) => codeEdit(e, dbid, "questions")}
                    />
                    <div className="pointer red" onClick={() => deleteData(dbid)}>&#10008;</div>
                </div>
            }
            {answers.map(answer => (
                    <div className={s.answer} key={Object.keys(answer)[0]}>
                        <input 
                            type="text" 
                            name="answer"
                            id={Object.keys(answer)[0]}
                            placeholder={Object.values(answer)[0][1]}
                            onBlur={(e) => editAnswer(e, "answers")}
                        />
                        <div className="pointer red" onClick={() => deleteData(Object.keys(answer)[0])}>&#10008;</div>
                </div>))
            }
        </>
    )
}

export default AnswersAndCode;