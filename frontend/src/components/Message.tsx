import React, { useEffect, useMemo, useState } from "react";
import { DAILY_MESSAGES } from "../data/messages";

type DailyMsg = {
    day: string;      // YYYY-MM-DD
    idx: number;      // 1..N
    text: string;
};

const CACHE_KEY = "dad_dashboard_daily_message_v1";

function todayLocal(): string {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}

function dayNumber(dayStr: string) {
    // stable integer for date, independent of time-of-day
    return Math.floor(new Date(dayStr + "T00:00:00").getTime() / 86400000);
}

export default function DailyMessage() {
    const today = useMemo(() => todayLocal(), []);
    const [msg, setMsg] = useState<DailyMsg | null>(null);

    useEffect(() => {
        // 1) cache so it never changes during the day even if you reorder the array later
        try {
            const raw = localStorage.getItem(CACHE_KEY);
            if (raw) {
                const cached = JSON.parse(raw) as DailyMsg;
                if (cached?.day === today) {
                    setMsg(cached);
                    return;
                }
            }
        } catch {
            // ignore
        }

        // 2) compute today's message
        const n = DAILY_MESSAGES.length;
        if (n === 0) {
            setMsg({
                day: today,
                idx: 0,
                text: "No messages configured yet.",
            });
            return;
        }

        const offset = ((dayNumber(today) % n) + n) % n;
        const computed: DailyMsg = {
            day: today,
            idx: offset + 1,
            text: DAILY_MESSAGES[offset],
        };

        setMsg(computed);
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(computed));
        } catch {
            // ignore
        }
    }, [today]);

    if (!msg) return <p>Loading message…</p>;

    return (
        <div className="daily-message">
            <div className="daily-message-meta">
                <span className="daily-message-date">{msg.day}</span>
                {msg.idx > 0 ? (
                    <span className="daily-message-count">Advice #{msg.idx}</span>
                ) : null}
            </div>

            <p className="daily-message-text">“{msg.text}”</p>


        </div>
    );
}
