import React, { useRef } from "react";
import HeroBanner from "../components/home/HeroBanner";
import "../components/home/HeroBanner.css";
import Footer from '../components/Footer';


function HomePage() {
    return (
        <div className="container">
            <HeroBanner />
            <Footer />
        </div>
    )
}
export default HomePage;