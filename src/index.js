import React from "react";
import ReactDOM from "react-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@fluentui/react";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { MapboxProvider } from "./@mapbox";
import { ToastProvider } from "./@ui/toasts/ToastProvider";

initializeIcons();
const theme = createTheme({});

if (window.location.hostname === "localhost") {
  localStorage.debug = "*";
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <MapboxProvider>
          <App />
        </MapboxProvider>
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
