import { legacy_createStore as createStore, applyMiddleware, compose } from "redux"; //TODO configureStore로 변경
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./modules/index";

const isProduction = process.env.NODE_ENV === "production";

const configureStore = () => {
    const enhancer = isProduction
        ? compose(applyMiddleware(thunk))
        : composeWithDevTools(applyMiddleware(thunk));
    const store = createStore(rootReducer, enhancer);

    return store;
};

const wrapper = createWrapper(configureStore, { debug: !isProduction });

export default wrapper;