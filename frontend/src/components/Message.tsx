import React, { useEffect, useState } from "react";

interface MessageResponse {
    message: string;
}

const DailyMessage: React.FC = () => {
    const [message, setMessage] = useState<string>("Loading...");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        fetch("http://127.0.0.1:4000/api/message")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data: MessageResponse) => {
                setMessage(data.message);
            })
            .catch((err) => {
                console.error(err);
                setError("Could not load message.");
            });
    }, []);

    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return <p style={{ fontSize: "1.1rem" }}>{message}</p>;
};

export default DailyMessage;
