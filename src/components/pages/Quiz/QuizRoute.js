import React from 'react'
import {withRouter} from 'react-router-dom'

const QuizRoute = (props) => {
    //console.log('sQuizRoute',props)
    return (
        <div>
            <h1>{props.match.params.name}</h1>
        </div>
    )
}

export default withRouter(QuizRoute);