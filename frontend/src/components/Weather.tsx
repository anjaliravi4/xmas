import React from "react";
import { useEffect, useState } from "react";

type WeatherEntry = {
    label: string;
    location: string;
    temp: string;
    condition: string;
};

const Weather = () => {
    const [entries, setEntries] = useState<WeatherEntry[]>([]);
    const [error, setError] = useState("");

    const API_KEY = "2c13ef8b17e54f1da8741255250212"; // <-- paste your key here

    // Locations you want
    const locations = [
        { label: "You", query: "Austin,USA" },
        { label: "Anju", query: "Montreal,Canada" },
        { label: "Maya", query: "Zaragoza,Spain" },
    ];

    useEffect(() => {
        Promise.all(
            locations.map((loc) =>
                fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${loc.query}&aqi=no`
                ).then((r) => r.json())
            )
        )
            .then((results) => {
                const formatted = results.map((data: any, i: number) => ({
                    label: locations[i].label,
                    location: data.location.name,
                    temp: Math.round(data.current.temp_f) + "°F",
                    condition: data.current.condition.text,
                }));

                setEntries(formatted);
            })
            .catch(() => setError("Could not load weather"));
    }, []);

    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (entries.length === 0) return <p>Loading weather…</p>;

    return (
        <div className="weather-widget">
            <div className="weather-header-row">
                <span className="weather-header-col">Who</span>
                <span className="weather-header-col">Location</span>
                <span className="weather-header-col">Weather</span>
            </div>

            <div className="weather-list">
                {entries.map((entry) => (
                    <div key={entry.label} className="weather-row">
                        <span className="weather-label">{entry.label}:</span>
                        <span className="weather-location">{entry.location}</span>
                        <span className="weather-info">
              <span className="weather-temp">{entry.temp}</span>
              <span className="weather-description">{entry.condition}</span>
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Weather;
