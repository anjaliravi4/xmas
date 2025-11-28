import React, { useEffect, useState } from "react";
import "./App.css";

interface HelloResponse {
    message: string;
}

function App() {
    const [backendMessage, setBackendMessage] = useState<string>("Loading...");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        fetch("http://127.0.0.1:4000/api/hello")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data: HelloResponse) => {
                setBackendMessage(data.message);
            })
            .catch((err) => {
                console.error(err);
                setError(`Error connecting to backend: ${(err as Error).message}`);
                setBackendMessage(""); // clear loading message
            });
    }, []);

    return (
        <div className="App" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>🎄 Dad Dashboard</h1>

            {error && (
                <div style={{ color: "red", marginBottom: "1rem" }}>
                    {error}
                </div>
            )}

            {!error && (
                <div>
                    <p><strong>Backend says:</strong> {backendMessage}</p>
                </div>
            )}

            {/* Future widgets will go here */}
            <div style={{ marginTop: "2rem" }}>
                <p>Weather, Calendar, Photos, Stocks, To-Do List…</p>
            </div>
        </div>
    );
}

export default App;
