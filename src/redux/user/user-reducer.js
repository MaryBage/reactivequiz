const INITIAL_STATE = {
    user: null,
    access_token: null
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_CURRENT_USER":
            return {...state, ...action.payload};
        case "LOGOUT_USER":
            return {
                ...state,
                user: null
            };

        default:
            return state;
    }


};
export default userReducer;