import React, { useState, useContext} from 'react';
import { DbContext } from './context/database/dbContext';
import './Admin.css';
import { useForm } from "react-hook-form";
import {withRouter} from 'react-router-dom';


const AddForm = (props) => {

    const answers = new Array(5).fill(1);
    const {addData} = useContext(DbContext);

    const { register, handleSubmit } = useForm();
    const [addValidation, setAddValidation] = useState({validation: false,
                                                        error:'', 
                                                        success: false,
                                                        category: 1,
                                                        question: 1,
                                                        answer: 1,
                                                        point: 1
                                                    })

    const [qstnType, setQstnType] = useState('single')
    const [qstnPoint, setQstnPoint] = useState('')

    const qstnTypeChangeHandler = (e) => {
        setQstnType(e.target.value);
        hideSuccessMsg();
    }
    const pointChangeHandler = e => {
        setQstnPoint(e.target.value)
        hideSuccessMsg();
    }
    const sbmtHandler = data => {
 
        const myData = {
            question: data.question, 
            code: data.code, 
            qstnType: data.qstnType, 
            category: data.category,
            difficulty: data.difficulty,
            answers: []
        }

        let validation = true;
        let question = true;
        let answer = true;
        let point = true;
        let category = true;
        let error = '';
        let myType = new Array(data.answer.length).fill(false)
        let myPoint = new Array(data.answer.length).fill(0)

        if(typeof data.type == 'string') {
            myType[+data.type] = !!data.type;
        }
        else {
            myType = data.type.map(e => !!e);
        }

        if(typeof data.point == 'string' ) {
            if(data.qstnType == 'multiple'){
               const cnt =  myType.filter(e => e).length
               myPoint = myType.map(e => !!e * data.point/cnt)
            }
            else {
             myPoint[+data.type] = parseFloat(data.point)
            }
        }
        else {
            myPoint = data.point
        }


        if(!data.question){
           /* error += 'Question field is empty.\n'*/
            validation = question = false;
        } 
        if(!data.category){
           /* error += 'Category field is empty.\n'*/
            validation = category = false;
        } 
        if(data.answer.filter(e => e).length < 2){
            error += 'Should be at least 2 answers.\n'
            validation = false;
        }
        if(!myType.some(e => e) ){
            error += 'There is no right answer.\n'
            validation = answer = false;
        }
        if(myPoint.every(e => !e)){
           /* error += 'There is no point for this question.\n'*/
            validation = point = false;
        }

        if(!myType.map((e,i) => e ? i : null).filter(e => e!=null).every(e => data.answer[e])){
            error += 'Right answer text is empty.\n'
            validation = false;
        }
 
        setAddValidation({...addValidation, validation, error , question, category, point, answer})

        if(validation) {
            data.answer.map((e,i) => {
                myData.answers.push({answer: e, point: myPoint[i], type: myType[i] })
            })
            addData(myData);

            setAddValidation({...addValidation, validation, error, success: true})
        }
    } 

    const hideSuccessMsg = () => {
        setAddValidation({...addValidation,success: false })
    }

    

return (
        <div className='addForm'>
                <div className='centerAdm'>   <div className='addFormHeader'>Add question</div></div>
                <form  onSubmit={handleSubmit(sbmtHandler)} onReset={() => {
                    setAddValidation({...addValidation, success: false})
                    setQstnPoint(1)
                    setQstnPoint('')
                    setQstnType('')
                    setQstnType('single')
                    setAddValidation({
                        category: 1,
                        question: 1,
                        answer: 1})
                    }}>
                    <div>
                    { addValidation.error 
                    ? addValidation.error.split ('\n').map ((item, i) => (
                              <><span style={{color:'red'}} key={i}>{item}</span><br/></>))
                    : addValidation.success
                       && <span className='successAnim' style={{color:'green'}}>Question is successfully added! Click&nbsp;
                       <input type='reset' className='resetBtn' value='&#8634;' name='reset' />&nbsp;to reset</span>
                         } 
                    </div>
                 
                <div className='row'> <input ref={register} 
                className='wideRow' 
                type='text' 
                name='question' 
                placeholder='Enter a question' 
                style= {!addValidation.question ? {backgroundColor: 'rgba(170, 10, 10, 0.25)'} : {}}
                onChange={hideSuccessMsg}  /></div>
                <div className='row'> <textarea  ref={register} cols='50' rows='4' name='code' placeholder='code here' onChange={hideSuccessMsg} className="addFormTxtarea" /></div>
                <div className='row' style={{flexFlow: 'row wrap'}}> <input ref={register} 
                type='text' 
                name='category' 
                placeholder='Enter a category' 
                style= {!addValidation.category ? {backgroundColor: 'rgba(170, 10, 10, 0.25)'} : {}}
                onChange={hideSuccessMsg} />
                <select name='difficulty' ref={register} onChange={qstnTypeChangeHandler}>
                        <option value='Easy'>easy</option>
                        <option value='Medium'>medium</option>
                        <option value='Hard'>hard</option>
                    </select>
       
                 <select name='qstnType' ref={register} onChange={qstnTypeChangeHandler} >
                        <option value='single'>single</option>
                        <option value='multiple'>multiple</option>
                    </select>
         
  <input type='number' 
  ref={register}  
  name='point'  
  step='1' 
  onChange={pointChangeHandler} 
  style= {!addValidation.point ? {backgroundColor: 'rgba(170, 10, 10, 0.25)'} : {}}
  placeholder='Score'/> 
                  </div>
                    {answers.map((_, i) => <div key={i} className='row'> 
                    {qstnType ==='single' ? 
                            <input ref={register} 
                            type='radio' 
                            key={`2${i}`} 
                            name='type'
                            value={i}
                            onChange={hideSuccessMsg}
                                /> 
                            :
                            <input ref={register} 
                            type='checkbox'
                            key={`3${i}`} 
                            name={`type[${i}]`}
                            value={i}
                            onChange={hideSuccessMsg}
                                /> 
                    }
                        
                        
                        &nbsp;
                        <input type='text' 
                        style= {!addValidation.answer ? {backgroundColor: 'rgba(170, 10, 10, 0.25)'} : {}}
                        className='wideRow' ref={register}  key={`1${i}`} name={`answer[${i}]`}  onChange={hideSuccessMsg}/> &nbsp;
                        {qstnPoint ? null : <input type='number'  ref={register} key={`4${i}`} size='1' name={`point[${i}]`}   step='0.2' onChange={hideSuccessMsg} />} 
                        </div>) }

                        <div className='centerAdm'><input value='Add question' type='submit' 
                        name='submit'
                         /> </div>
    
                </form>
            
        </div>

    )

}
export default withRouter(AddForm);