import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { legacy_createStore as createStore } from "redux";
// import ReduxThunk from "redux-thunk";
// import ReduxPromise from "redux-promise";
// import Reducer from "./redux/index";
import App from "./App.js";
import rootReducer from "./redux";

// const store = applyMiddleware(ReduxPromise, ReduxThunk)(createStore);
const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
