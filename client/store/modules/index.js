import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import userReducer from "./user";

export default function rootReducer(state, action) {
    switch (action.type) {
        case HYDRATE:
            return action.payload;
        default:
            return combineReducers({
                user: userReducer
            })(state, action);
    }
}