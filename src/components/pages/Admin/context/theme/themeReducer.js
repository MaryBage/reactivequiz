import { THEME } from "../types";

const handlers =  {
    [THEME]: (_, {payload}) => payload
}

export const themeReducer = (state, action) => {
    const handler = handlers[action.type] || Headers.DEFAULT
    return handler(state, action);    

}