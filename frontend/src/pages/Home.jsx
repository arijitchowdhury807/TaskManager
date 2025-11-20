import Navbar from "../components/Navbar";
import "../styles/Home.css";

export default function Home() {
  return (
    <>
     <Navbar />
      <div className="home-container">
     

      <div className="hero-section">
        <h1 className="hero-title">Organize Your Day Effortlessly</h1>

        <h3 className="hero-subtitle">
          A clean and simple Task Manager to keep you productive and focused.
        </h3>

       
      </div>
    </div>
    </>
  );
}
