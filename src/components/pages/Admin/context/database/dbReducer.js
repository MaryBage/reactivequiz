import { ADD_DATA, GET_DATA, UPDATE_DATA, DELETE_DATA,SET_LOADER } from "../types";

const handlers =  {
    [GET_DATA]: (state, {payload}) => ({...state, questions: payload, loading: false}),
    [SET_LOADER]: state => state,
    DEFAULT: state => state
}

export const dbReducer = (state, action) => {
    const handler = handlers[action.type] || Headers.DEFAULT
    return handler(state, action);    

}