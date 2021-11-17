import React from "react";
import ReactDOM from "react-dom";
import "./tailwind.output.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

const hist = createBrowserHistory({ basename: "/#/" });
ReactDOM.render(
  <Router history={hist}>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
