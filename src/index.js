import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { AccountContextProvider } from "./Stores/StoreAddress";

ReactDOM.render(
  <MoralisProvider
    appId="dnkwy92254yPjvb07n5KJB2BiaeNi3sWM2v8QiSn"
    serverUrl="https://6fsvg5rdojmt.usemoralis.com:2053/server"
  >
    <AccountContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AccountContextProvider>
  </MoralisProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
