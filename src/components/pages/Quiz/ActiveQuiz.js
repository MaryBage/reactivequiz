import React, { useState, useEffect } from 'react'
import Highlight, { defaultProps } from "prism-react-renderer"
import {faLongArrowAltRight,faLongArrowAltLeft} from '@fortawesome/free-solid-svg-icons'
import {CSSTransition} from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

export default function ActiveQuiz(props) {
    const  quiz = props.quiz;
    const [answeredQuiz, setQuiz] = useState(props.quiz);
    const [width, setWidth] = useState({w: window.innerWidth, dif:window.outerWidth - window.innerWidth});

    useEffect(() => {
      const handleResize = () => setWidth({w: window.innerWidth, dif:window.outerWidth - window.innerWidth});
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    });
    
    useEffect(() => {
        setQuiz(props.quiz);
    }, [props])

    
    const addUserAnswer  = (e) => {
        
        if(quiz.type == 'single')
          setQuiz({...answeredQuiz, isSubmitted:false, userAnswer: [+e.target.id]})
        if(quiz.type == 'multiple'){
            if(answeredQuiz.userAnswer.includes(+e.target.id))
                 setQuiz({...answeredQuiz, isSubmitted:false, userAnswer:answeredQuiz.userAnswer.filter( el => el != +e.target.id )})
            else{
                setQuiz({...answeredQuiz, isSubmitted:false, userAnswer: answeredQuiz.userAnswer.concat(+e.target.id)})
            }
        }
       
    }
    
    return (
    
        <div className="quizMain" style={width.w >=800 ? 
                                            { minWidth:'800px', gridTemplateColumns: 'repeat(2, 50%)' } : 
                                            { minWidth:'400px', gridTemplateRows: 'repeat(2, 50%)' } 
                                        }>
                 
            <div className="question" value={quiz.questionDbId} >
                {`${quiz.questionId}. ${quiz.question}`}
                {quiz.code ?
                <Highlight {...defaultProps} code={quiz.code} language="javascript">
                    {({ className, tokens, getLineProps, getTokenProps }) => (
                    <pre className={className} >
                        {tokens.map((line, i) => {
                            const updatedTokenLine = {...getLineProps({ line, key: i  })};
                        return <div 
                                className = {updatedTokenLine.className} 
                                key = {updatedTokenLine.key} 
                                >
                            {line.map((token, key) => {
                                const updatedTokenProps = {...getTokenProps({ token, key })};
                            return <span 
                                        children ={updatedTokenProps.children} 
                                        className = {updatedTokenProps.className} 
                                        key = {updatedTokenProps.key} 
                                    />
                            })}
                        </div>
                    })}
                    </pre>
                    )}
                </Highlight>
                : ''}
                
           </div>
          <form 
                className="answer" 
                onSubmit = {(e) => props.onSbmtHandler(e, answeredQuiz, props.activeQuestion)}>

                <div className='choice'>
                    {quiz.options.map(option => {
                        return <div key ={`${quiz.questionId}${option[0]}`} >
                        <input
                            type = {answeredQuiz.type ==='single' ? 'radio' : 'checkbox'} 
                            name = 'answers' 
                            key = {option[0]} 
                            id = {option[0]}
                            checked = {answeredQuiz.userAnswer.includes(+option[0]) ? 'checked' : ''}
                            onChange = {addUserAnswer} />
                        <label 
                        htmlFor = {option[0]}>
                        {option[1]}
                        </label>
                        </div>
                    })}
                </div>
                <div className='btns'>
                    {quiz.questionId === 1 ? null
                    :<button 
                    
                    value='back' 
                    key='back'
                    onClick = {(e) => props.onBackClickHandler(e, answeredQuiz, props.activeQuestion)} >
                        <FontAwesomeIcon icon={faLongArrowAltLeft} /> 
                        <span>back</span>
                    </button>
                }

                <input 
                className='answSbmt'
                disabled = {!answeredQuiz.userAnswer.length}
                value = 'submit'
                type = 'submit' 
                key = 'submit'/>

                {quiz.questionId === props.lastQuestion ? null
                    :<button 
                         
                        value='next'
                        key='next' 
                        onClick = {(e) => props.onNextClickHandler(e, answeredQuiz, props.activeQuestion)} >
                            <span>next</span> 
                            <FontAwesomeIcon icon={faLongArrowAltRight} />
                    </button>
                }
                </div>
            </form> 
         </div> 
    )
}


ActiveQuiz.propTypes = {
    quiz: PropTypes.object ,
    lastQuestion: PropTypes.number,
    activeQuestion: PropTypes.number,
    onNextClickHandler: PropTypes.func,
    onBackClickHandler: PropTypes.func,
    onSbmtHandler: PropTypes.func,
}              
