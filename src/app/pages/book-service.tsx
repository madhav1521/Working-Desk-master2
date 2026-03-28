
import React from "react";
import { Helmet } from "react-helmet";
import NavbarComponent from "../components/navbarComponent";
import Subscribe1 from "../components/sunscribe1";
import SecondFooter from "../components/secondfooter";
import ServiceBookingPage from "../components/ServiceCatalog/ServiceBookingPage";

function Bookservicepage() {
    return (
        <>
            <Helmet>
                <title>Book Service — Helperland</title>
            </Helmet>
            <NavbarComponent />
            <ServiceBookingPage />
            <Subscribe1 />
            <SecondFooter />
        </>
    );
}

export default Bookservicepage;