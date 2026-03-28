import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const benefits = [
    { icon: "💼", title: "Flexible Schedule", desc: "Work on your own terms. Choose the jobs that fit your availability." },
    { icon: "💰", title: "Great Earnings", desc: "Earn competitive pay per job with weekly direct payments." },
    { icon: "📈", title: "Grow Your Business", desc: "Build a loyal customer base and grow your professional reputation." },
    { icon: "🛡️", title: "Full Support", desc: "We provide training, insurance coverage, and 24/7 operational support." },
];

function ServicePartnerCTA() {
    return (
        <section className="partner-cta-section">
            <div className="partner-cta-inner">
                <div className="partner-cta-content">
                    <span className="partner-cta-badge">Join Our Team</span>
                    <h2 className="partner-cta-title">Become Our Service Partner</h2>
                    <p className="partner-cta-subtitle">
                        Are you a skilled professional? Join our growing network of trusted
                        service partners and start earning more with flexible working hours.
                    </p>

                    <div className="partner-benefits-grid">
                        {benefits.map((b) => (
                            <div className="partner-benefit-item" key={b.title}>
                                <span className="partner-benefit-icon">{b.icon}</span>
                                <div>
                                    <h4 className="partner-benefit-title">{b.title}</h4>
                                    <p className="partner-benefit-desc">{b.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link to="/pro">
                        <Button className="partner-cta-btn">
                            Become Our Service Partner →
                        </Button>
                    </Link>
                </div>

                <div className="partner-cta-visual">
                    <div className="partner-visual-card">
                        <div className="partner-visual-icon">👷</div>
                        <h3>500+</h3>
                        <p>Active Service Partners</p>
                    </div>
                    <div className="partner-visual-card partner-visual-card--alt">
                        <div className="partner-visual-icon">⭐</div>
                        <h3>4.8/5</h3>
                        <p>Partner Satisfaction Rating</p>
                    </div>
                    <div className="partner-visual-card">
                        <div className="partner-visual-icon">💳</div>
                        <h3>Weekly</h3>
                        <p>Guaranteed Payouts</p>
                    </div>
                    <div className="partner-visual-card partner-visual-card--alt">
                        <div className="partner-visual-icon">📱</div>
                        <h3>Easy</h3>
                        <p>App-Based Job Management</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ServicePartnerCTA;
