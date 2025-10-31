import React from "react";
import HeroBanner from "../components/home/HeroBanner";
import AboutUs from "../components/home/AboutUs";
import "../components/home/HeroBanner.css";
import "../components/home/AboutUs.css";

function HomePage() {
    return (
        <>
            <HeroBanner />
            <AboutUs />
        </>
    )
}
export default HomePage;