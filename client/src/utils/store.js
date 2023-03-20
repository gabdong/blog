import { applyMiddleware, legacy_createStore as createStore } from "redux";
import ReduxThunk from "redux-thunk";
import ReduxPromise from "redux-promise";

import rootReducer from "../modules";

const createStoreWithMiddleware = applyMiddleware(
  ReduxPromise,
  ReduxThunk
)(createStore);
const store = createStoreWithMiddleware(rootReducer);

export default store;
