const INITIAL_STATE = {
    currentUser: null
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_CURRENT_USER":
            localStorage.setItem('currentUser', JSON.stringify({
                ...action.payload
            }));
            return {...action.payload};
        case "LOGOUT_USER":
            localStorage.setItem('currentUser', null);
            return {
                currentUser: null
            };

        default:
            return state;
    }


};
export default userReducer;