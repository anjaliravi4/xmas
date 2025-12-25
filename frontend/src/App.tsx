import React from "react";
import "./App.css";
import PhotoAlbum from "./components/PhotoAlbum";
import FamilyCalendar from "./components/Calendar";
import WeatherWidget from "./components/Weather";
import DailyMessage from "./components/Message";
import TodoList from "./components/ToDo";
import MarketIndex from "./components/Stock";

function App() {
    return (
        <div className="dad-dashboard">

            <header className="dashboard-header">
                <div className="dog dog-white idle-diagdown" />
                <h1>Dad Dashboard</h1>
                <div className="dog dog-black run-dir-up" />
            </header>

            <main className="dashboard-grid">

                {/* 1 — Weather (gets prime horizontal space) */}
                <section className="widget-card">
                    <h2 className="widget-title">Weather</h2>
                    <div className="widget-body"><WeatherWidget /></div>
                </section>

                {/* 2 — Daily Message (stacks under Weather) */}
                <section className="widget-card">
                    <h2 className="widget-title">Daily Message</h2>
                    <div className="widget-body"><DailyMessage /></div>
                </section>

                {/* 3 — S&P (still large, but now gets slightly less width) */}
                <section className="widget-card large">
                    <h2 className="widget-title">S&P 500</h2>
                    <div className="widget-body"><MarketIndex /></div>
                </section>

                <section className="widget-card">
                    <h2 className="widget-title">Photo Album</h2>
                    <div className="widget-body"><PhotoAlbum /></div>
                </section>

                <section className="widget-card">
                    <h2 className="widget-title">To-Do List</h2>
                    <div className="widget-body"><TodoList /></div>
                </section>

                <section className="widget-card">
                    <h2 className="widget-title">Family Calendar</h2>
                    <div className="widget-body"><FamilyCalendar /></div>
                </section>


            </main>

        </div>
    );
}

export default App;
