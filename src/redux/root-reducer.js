import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userReducer from "./user/user-reducer";
import quizInfoReducer from "./quizInfo/quizInfo-reducer";
import studentReducer from "./student/student-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "quizInfo"],
};

const rootReducer = combineReducers({
  user: userReducer,
  quizInfo: quizInfoReducer,
  students: studentReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
