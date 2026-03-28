import React from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

const categories = [
    {
        icon: "🧹",
        name: "Home Cleaning",
        desc: "Deep cleaning for every room in your home",
        price: "₹500",
        color: "#2e7d32",
        bg: "#e8f5e9",
    },
    {
        icon: "🌀",
        name: "Fan Service",
        desc: "Ceiling fan cleaning, repair & installation",
        price: "₹300",
        color: "#e65100",
        bg: "#fff3e0",
    },
    {
        icon: "🗄️",
        name: "Cupboard Service",
        desc: "Cupboard deep cleaning & organisation",
        price: "₹400",
        color: "#4527a0",
        bg: "#ede7f6",
    },
    {
        icon: "🛏️",
        name: "Bed Service",
        desc: "Mattress cleaning & bed bug treatment",
        price: "₹350",
        color: "#c62828",
        bg: "#ffebee",
    },
    {
        icon: "🔝",
        name: "Ceiling Service",
        desc: "Ceiling cleaning, painting & false ceiling repair",
        price: "₹600",
        color: "#00838f",
        bg: "#e0f7fa",
    },
    {
        icon: "⚡",
        name: "Electrical Service",
        desc: "Wiring repair, switches & light installation",
        price: "₹400",
        color: "#f9a825",
        bg: "#fffde7",
    },
    {
        icon: "🔧",
        name: "Plumbing Service",
        desc: "Pipe repair, tap installation & drain cleaning",
        price: "₹450",
        color: "#1565c0",
        bg: "#e3f2fd",
    },
    {
        icon: "❄️",
        name: "AC Service",
        desc: "AC cleaning, repair, gas refill & installation",
        price: "₹700",
        color: "#00695c",
        bg: "#e0f2f1",
    },
    {
        icon: "🔩",
        name: "Appliance Repair",
        desc: "Washing machine, fridge, microwave & geyser",
        price: "₹500",
        color: "#6a1b9a",
        bg: "#f3e5f5",
    },
    {
        icon: "🐛",
        name: "Pest Control",
        desc: "Cockroach, termite, mosquito & rodent control",
        price: "₹800",
        color: "#bf360c",
        bg: "#fbe9e7",
    },
    {
        icon: "🎨",
        name: "Painting",
        desc: "Interior, exterior & texture painting services",
        price: "₹1000",
        color: "#ad1457",
        bg: "#fce4ec",
    },
    {
        icon: "🪚",
        name: "Carpentry",
        desc: "Furniture repair, door fix & cabinet making",
        price: "₹500",
        color: "#4e342e",
        bg: "#efebe9",
    },
];

function ServiceCategories() {
    return (
        <section className="svc-categories-section">
            <div className="svc-categories-header">
                <span className="svc-section-badge">What We Offer</span>
                <h2 className="svc-section-title">Our Cleaning Services</h2>
                <p className="svc-section-subtitle">
                    Expert cleaning solutions for your home, booked online in minutes.
                    Trusted professionals at your doorstep.
                </p>
            </div>

            <div className="svc-categories-grid-wrap">
                <Grid container spacing={3} justifyContent="center">
                    {categories.map((cat) => (
                        <Grid item xl={2} lg={3} md={4} sm={6} xs={12} key={cat.name}>
                            <Link to="/bookservice" style={{ textDecoration: "none" }}>
                                <div
                                    className="svc-category-card"
                                    style={{ "--cat-color": cat.color, "--cat-bg": cat.bg } as React.CSSProperties}
                                >
                                    <div className="svc-category-icon-wrap">
                                        <span className="svc-category-icon">{cat.icon}</span>
                                    </div>
                                    <h3 className="svc-category-name">{cat.name}</h3>
                                    <p className="svc-category-desc">{cat.desc}</p>
                                    <div className="svc-category-footer">
                                        <span className="svc-category-price">From {cat.price}/hr</span>
                                        <span className="svc-category-arrow">→</span>
                                    </div>
                                </div>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </section>
    );
}

export default ServiceCategories;
