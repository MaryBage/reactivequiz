import axios from "../../axios/axios-quiz";

export const fetchCollectionStart = () => ({
  type: "FETCH_COLLECTION_START",
});

export const fetchCollectionSuccess = (collectionsMap) => ({
  type: "FETCH_COLLECTION_SUCCESS",
  payload: collectionsMap,
});

export const fetchCollectionFail = (error) => ({
  type: "FETCH_COLLECTION_FAIL",
  payload: error,
});

export const fetchCollectionStartAsync = (id) => {
  return async (dispatch) => {
    dispatch(fetchCollectionStart());
    try {
      const res = await axios.post(
        "/students.php",
        btoa(JSON.stringify({ creator: id, action: "get" }))
      );

      const payload = res.data.map((student) => {
        return {
          quizName: student.quizName,
          name: student.name,
          email: student.email,
          quizId: student.quizId,
          result_json: student.result_json,
          score: student.score,
          percentage: student.percentage,
          date: student.date,
        };
      });
      dispatch(fetchCollectionSuccess(payload));
    } catch (e) {
      fetchCollectionFail(e.message);
    }
  };
};
