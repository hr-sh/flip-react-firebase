import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ViewContextProvider } from "./context/ViewContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ViewContextProvider>
        <App />
      </ViewContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
