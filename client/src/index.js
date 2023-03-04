import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import store from "./utils/store.js";

import App from "./App.js";

const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl);

rootEl.classList.add("scroll");
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
