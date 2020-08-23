const INITIAL_STATE = {
  students: [],
  isFetching: false,
  errorMessage: null,
};
const studentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_COLLECTION_START":
      return { ...state, isFetching: true };
    case "FETCH_COLLECTION_SUCCESS":
      return {
        ...state,
        isFetching: false,
        students: action.payload,
      };
    case "FETCH_COLLECTION_FAIL":
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
export default studentReducer;
