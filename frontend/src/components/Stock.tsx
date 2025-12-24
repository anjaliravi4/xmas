import React, { useEffect, useRef } from "react";

export default function MarketIndex() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // IMPORTANT: clear old widget on hot reload / remount
        container.innerHTML = "";

        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
        script.async = true;

        script.innerHTML = JSON.stringify({
            symbols: [["S&P 500 (SPY)", "AMEX:SPY|1D"]],
            chartOnly: false,
            width: "100%",
            height: 450,
            locale: "en",
            colorTheme: "dark",
            autosize: true,
            showVolume: true,
            showMA: true,
            hideDateRanges: false,
            hideMarketStatus: false,
            hideSymbolLogo: false,
            scalePosition: "right",
            scaleMode: "Normal",
            fontFamily:
                "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
            fontSize: "12",
            valuesTracking: "1",
            changeMode: "price-and-percent",
        });

        container.appendChild(script);
    }, []);

    return (
        <div className="market-widget">
            <div className="market-widget-header">
                <a
                    className="market-link"
                    href="https://www.tradingview.com/symbols/AMEX-SPY/"
                    target="_blank"
                    rel="noreferrer"
                >
                    Open →
                </a>
            </div>

            <div className="tradingview-widget-container" ref={containerRef} />
        </div>
    );
}
