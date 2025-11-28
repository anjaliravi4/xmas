import React from "react";
import PhotoAlbum from "./components/PhotoAlbum";
import FamilyCalendar from "./components/Calendar.tsx";
import WeatherWidget from "./components/Weather";
import DailyMessage from "./components/Message.tsx";
import TodoList from "./components/ToDo.tsx";

function App() {
    return (
        <div className="App" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>🎄 Dad Dashboard</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "1.5rem",
                    marginTop: "1.5rem",
                }}
            >
                <div>
                    <h2>Photo Album</h2>
                    <PhotoAlbum />
                </div>

                <div>
                    <h2>Family Calendar</h2>
                    <FamilyCalendar />
                </div>

                <div>
                    <h2>Weather</h2>
                    <WeatherWidget />
                </div>

                <div>
                    <h2>Daily Message</h2>
                    <DailyMessage />
                </div>

                <div>
                    <h2>To-Do List</h2>
                    <TodoList />
                </div>
            </div>
        </div>
    );
}

export default App;
