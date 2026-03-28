import Footer from "../components/footer";
import NavbarComponent from "../components/navbarComponent";
import Banner from "../components/banner";
import Blog from "../components/blog";
import Customer from "../components/customer";
import Services from "../components/services";
import ServiceCategories from "../components/ServiceCategories";
import StatsSection from "../components/StatsSection";
import ServicePartnerCTA from "../components/ServicePartnerCTA";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Resetpass from "../components/resetpassDialoge";
import { useEffect, useState } from "react";

function Homepage() {
    const [open, setopen] = useState(false);
    let { token } = useParams();

    useEffect(() => {
        if (token) {
            setopen(true);
        }
    }, [token]);

    return (
        <>
            <Helmet>
                <title>Helperland — Professional Home Services</title>
            </Helmet>

            {/* Fixed Navbar */}
            <NavbarComponent />

            {/* Hero Banner + How It Works */}
            <Banner />

            {/* Service Categories Grid */}
            <ServiceCategories />

            {/* Stats / About section */}
            <StatsSection />

            {/* Why Choose Us — existing section */}
            <Services />

            {/* Customer Reviews */}
            <Customer />

            {/* Blog Section */}
            <Blog />

            {/* Become Our Service Partner CTA */}
            <ServicePartnerCTA />

            {/* Footer */}
            <Footer />

            {/* Reset Password Dialog */}
            <Resetpass token={token} open={open} />
        </>
    );
}

export default Homepage;
