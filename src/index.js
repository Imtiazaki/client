import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: "f171d63df169dea198f8",
  cluster: "ap1",
  wsHost: "",
  wsPort: 80,
  wssPort: 443,
  forceTLS:"https",
  enabledTransports: ["ws", "wss"],
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
