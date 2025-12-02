import React from "react";
import "./App.css";
import PhotoAlbum from "./components/PhotoAlbum";
import FamilyCalendar from "./components/Calendar";
import WeatherWidget from "./components/Weather";
import DailyMessage from "./components/Message";
import TodoList from "./components/ToDo";

function App() {
    return (
        <div className="dad-dashboard">
            <header className="dashboard-header">
                <h1>🎄 Dad Dashboard</h1>
                <p className="dashboard-subtitle">
                    A little home base for your day.
                </p>
            </header>

            <main className="dashboard-grid">
                <section className="widget-card">
                    <h2 className="widget-title">Photo Album</h2>
                    <PhotoAlbum />
                </section>

                <section className="widget-card">
                    <h2 className="widget-title">Family Calendar</h2>
                    <FamilyCalendar />
                </section>

                <section className="widget-card">
                    <h2 className="widget-title">Weather</h2>
                    <WeatherWidget />
                </section>

                <section className="widget-card">
                    <h2 className="widget-title">Daily Message</h2>
                    <DailyMessage />
                </section>

                <section className="widget-card">
                    <h2 className="widget-title">To-Do List</h2>
                    <TodoList />
                </section>
            </main>
        </div>

    );
}

export default App;
