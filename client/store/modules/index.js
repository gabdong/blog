import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

export default function rootReducer(state, action) {
    switch (action.type) {
        case HYDRATE:
            return action.payload;
        default:
            return combineReducers({})(state, action);
    }
}