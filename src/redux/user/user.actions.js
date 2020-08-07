export const setCurrentUser = data => ({
    type: 'SET_CURRENT_USER',
    payload: data
});
export const logoutUser = () => ({
    type: 'LOGOUT_USER'
});