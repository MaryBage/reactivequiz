const INITIAL_STATE = {
    user: null,
    access_token: null
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_CURRENT_USER":
            console.log(action)
            return {...state, ...action.payload};
        case "LOGOUT_USER":
            return {
                ...state,
                user: null,
                access_token: null
            };
        case "UPDATE_SETTINGS":
            const user = state.user;
            const newUser = {...user,...action.payload}
            return {...state,user:newUser}

        default:
            return state;
    }


};
export default userReducer;