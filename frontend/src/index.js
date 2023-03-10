import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import axios from "axios";
import App from "./App";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? `${process.env.PATH_BACK}/api`
    : "http://localhost:3001/api";
// axios.defaults.baseURL = "http://localhost:3001";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
