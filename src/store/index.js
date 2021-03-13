import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({});

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
