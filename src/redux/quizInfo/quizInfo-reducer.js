const INITIAL_STATE = {
    duration: null,
    creator: null,
    start: null,
    quizId: null,
    quizName: null,
    userName: null,
    email: null

};
const quizInfoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "UPDATE_QUIZ_INFO":
            return {...state, ...action.payload};
        default:
            return state;
    }


};
export default quizInfoReducer;