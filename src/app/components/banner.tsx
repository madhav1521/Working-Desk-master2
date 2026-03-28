import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const quickServices = [
    { icon: "🧹", label: "Home Cleaning" },
    { icon: "🛋️", label: "Sofa Cleaning" },
    { icon: "🌀", label: "Fan Service" },
    { icon: "❄️", label: "AC Service" },
    { icon: "🐛", label: "Pest Control" },
    { icon: "🔧", label: "Plumbing" },
];

function Banner() {
    function handleBook() {
        if (!localStorage.getItem("user")) {
            toast("Please login to book a service!");
        }
    }

    return (
        <>
            <div className="hero-banner">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <p className="hero-badge">⭐ Trusted by 10,000+ Happy Customers</p>
                    <h1 className="hero-title">
                        Professional Home Services<br />
                        <span className="hero-title-accent">You Can Trust</span>
                    </h1>
                    <p className="hero-subtitle">
                        Expert home cleaning, fan service, AC repair, pest control &amp; more —
                        available at your doorstep. Book online in minutes.
                    </p>

                    <div className="hero-features">
                        <span className="hero-feature-item">✓ Certified &amp; Insured Experts</span>
                        <span className="hero-feature-item">✓ Easy Online Booking</span>
                        <span className="hero-feature-item">✓ Secure Payment</span>
                        <span className="hero-feature-item">✓ 24/7 Customer Support</span>
                    </div>

                    <div className="hero-actions">
                        <Link to="/bookservice">
                            <Button className="hero-book-btn" onClick={handleBook}>
                                Book Now
                            </Button>
                        </Link>
                        <Link to="/prices">
                            <Button className="hero-prices-btn">
                                View Prices
                            </Button>
                        </Link>
                    </div>

                    <div className="hero-quick-services">
                        {quickServices.map((s) => (
                            <Link to="/bookservice" key={s.label}>
                                <div className="hero-quick-card">
                                    <span className="hero-quick-icon">{s.icon}</span>
                                    <span className="hero-quick-label">{s.label}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="how-it-works">
                <h2 className="hiw-title">How It Works</h2>
                <div className="hiw-steps">
                    <div className="hiw-step">
                        <div className="hiw-step-num">1</div>
                        <div className="hiw-step-icon">📍</div>
                        <h3>Enter Postcode</h3>
                        <p>We check service availability in your area instantly.</p>
                    </div>
                    <div className="hiw-arrow">→</div>
                    <div className="hiw-step">
                        <div className="hiw-step-num">2</div>
                        <div className="hiw-step-icon">📋</div>
                        <h3>Select Your Plan</h3>
                        <p>Choose service type, date, time and add-ons.</p>
                    </div>
                    <div className="hiw-arrow">→</div>
                    <div className="hiw-step">
                        <div className="hiw-step-num">3</div>
                        <div className="hiw-step-icon">💳</div>
                        <h3>Pay Securely</h3>
                        <p>Safe online payment via Razorpay. No hidden charges.</p>
                    </div>
                    <div className="hiw-arrow">→</div>
                    <div className="hiw-step">
                        <div className="hiw-step-num">4</div>
                        <div className="hiw-step-icon">🏠</div>
                        <h3>Enjoy the Service</h3>
                        <p>A vetted professional arrives at your door on time.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Banner;
