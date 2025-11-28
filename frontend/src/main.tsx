import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style.css";

ReactDOM.createRoot(
    document.querySelector<HTMLDivElement>("#app") as HTMLElement
).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
