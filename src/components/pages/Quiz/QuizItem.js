import React, { useState, useEffect, useRef } from 'react'
import { RadioGroup, Radio, FormControl, FormControlLabel, FormLabel } from '@material-ui/core';
import Highlight, { defaultProps } from "prism-react-renderer";
<<<<<<< HEAD
import {withRouter, Route} from 'react-router-dom'
import QuizRoute from './QuizRoute';


const  Quiz = (props) => {
//console.log(props);
const  quiz = props.quiz;
const [q,setQ] = useState({activeQuestion: 1, quiz})

console.log(q);
const sbmtHandler = (event) =>{
  console.log('event',event);
}
=======
//import theme from "prism-react-renderer/themes/nightOwl";


export default function Quiz({ quiz }) {
  console.log(quiz);
>>>>>>> da2fc0efac8a35e2c36675d1415e276f0227ac60
  return (
  <Route to={'/quiz/:name'} component={QuizRoute} />
   )
}
export default withRouter(Quiz);

/*() => {
    return <div className="main" name={'/'+quiz.questionId} value={props.match.params.id}>
     <div className="question" value={quiz.questionId} >
        {quiz.question}
<<<<<<< HEAD
        {quiz.code?
                <Highlight {...defaultProps} code={quiz.code} language="javascript">
                    {({ className, tokens, getLineProps, getTokenProps }) => (
                    <pre className={className}>
                        {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => {
                                const updatedTokenProps = {...getTokenProps({ token, key })};
                            return <span children ={updatedTokenProps.children} className = {updatedTokenProps.className} key = {updatedTokenProps.key} />
                            })}
                        </div>
                        ))}
                    </pre>
                    )}
                </Highlight>
                : ''}
            
        </div>
        
          <div className="answer">
          <form>
              {quiz.options.map((option,i) => {
              return <div>
                <input type={quiz.type=='single' ? 'radio' : 'checkbox'} name={`answrOf${quiz.questionId}`} value={option} key={option} id={quiz.questionId+i} />
                <label for={quiz.questionId+i}>{option}</label>

                
              </div>
            })}
              <div>
                 <input type='button' value='back' onClick={() => {
                  props.history.push('/'+quiz.questionId)
                  console.log('after onclick',props)
                }} />
                 <input type='button' name='sumbit' value='submit' /> 
                 <input type='button' value='next' onClick={() => props.history.push('quiz/'+(quiz.questionId+4))}/>
               </div>
               </form> 
          </div>
        
    </div> }*/
=======
        {quiz.code ?
          <Highlight {...defaultProps} code={quiz.code} language="javascript">
            {({ className, tokens, getLineProps, getTokenProps }) => (
              <pre className={className}>
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => {
                      const updatedTokenProps = { ...getTokenProps({ token, key }) };
                      return <span children={updatedTokenProps.children} className={updatedTokenProps.className} key={updatedTokenProps.key} />
                    })}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
          : ''}

      </div>
      <div className="answer">

        {quiz.options.map((option, i) => {
          return <div>
            <input type={quiz.type == 'single' ? 'radio' : 'checkbox'} name={`answrOf${quiz.questionId}`} value={option} key={option} id={quiz.questionId + i} />
            <label for={quiz.questionId + i}>{option}</label>
          </div>
        })}
      </div>
    </div>
  )
}
>>>>>>> da2fc0efac8a35e2c36675d1415e276f0227ac60
