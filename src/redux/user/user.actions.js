export const setCurrentUser = user => ({
    type: 'SET_CURRENT_USER',
    payload: user
});
export const logoutUser = () => ({
    type: 'LOGOUT_USER'
});