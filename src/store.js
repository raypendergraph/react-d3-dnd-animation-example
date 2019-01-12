import { createStore } from "redux";
import treeReducer from "./reducer";
import initialState from "./fakeData";
export default createStore(treeReducer, initialState);
