import HeroBanner from "../components/home/HeroBanner";
import Footer from "../components/Footer";
import "../components/home/HeroBanner.css";

function HomePage() {
  return (
    <div className="container">
      <HeroBanner />
      <Footer />
    </div>
  );
}

export default HomePage;