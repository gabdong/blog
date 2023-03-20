import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import { hydrate, render } from "react-dom";

import store from "./utils/store.js";

import App from "./App.js";

const rootEl = document.getElementById("root");
const root = ReactDOM.createRoot(rootEl);

rootEl.classList.add("scroll");

if (rootEl.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootEl, 
    <HelmetProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </HelmetProvider>
  )
} else {
  root.render(
    <HelmetProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </HelmetProvider>
  );
}
