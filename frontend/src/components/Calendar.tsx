// src/components/FamilyCalendar.tsx
import React from "react";

const FamilyCalendar: React.FC = () => {
    // From Google Calendar → Settings → Integrate calendar → "Embed code"
    const calendarSrc =
        "https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=America%2FToronto";

    return (
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
            <iframe
                src={calendarSrc}
                style={{ border: 0, width: "100%", height: "400px" }}
                frameBorder={0}
                scrolling="no"
                title="Family Calendar"
            ></iframe>
        </div>
    );
};

export default FamilyCalendar;
