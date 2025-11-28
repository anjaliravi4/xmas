// src/components/WeatherWidget.tsx
import React from "react";

const WeatherWidget: React.FC = () => {
    return (
        <div>
            <p>Today: 2°C, cloudy, light wind</p>
            {/* Later: call a real weather API from the backend */}
        </div>
    );
};

export default WeatherWidget;
