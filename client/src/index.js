import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import ReduxThunk from "redux-thunk";
import ReduxPromise from "redux-promise";
import rootReducer from "./modules";
import App from "./App.js";

const createStoreWithMiddleware = applyMiddleware(
  ReduxPromise,
  ReduxThunk
)(createStore);
const store = createStoreWithMiddleware(rootReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
