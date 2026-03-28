import React from "react";

const stats = [
    { value: "10,000+", label: "Happy Customers", icon: "😊" },
    { value: "500+", label: "Expert Professionals", icon: "👷" },
    { value: "15+", label: "Cities Served", icon: "📍" },
    { value: "4.8★", label: "Average Rating", icon: "⭐" },
];

function StatsSection() {
    return (
        <section className="stats-section">
            <div className="stats-inner">
                <div className="stats-text">
                    <h2 className="stats-title">Your Trusted Cleaning Partner</h2>
                    <p className="stats-desc">
                        We specialise in comprehensive home services — from deep cleaning and fan
                        service to pest control and appliance repair — ensuring a spotless,
                        comfortable home across cities in India.
                    </p>
                </div>
                <div className="stats-numbers">
                    {stats.map((s) => (
                        <div className="stat-item" key={s.label}>
                            <span className="stat-icon">{s.icon}</span>
                            <span className="stat-value">{s.value}</span>
                            <span className="stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default StatsSection;
