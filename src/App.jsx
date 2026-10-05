import CarScene from "./components/CarScene";
import "./App.css";

function App() {
  return (
    <main className="website">

      <nav className="navbar">
        <div className="logo">BEYOND</div>

        <div className="nav-links">
          <span>Home</span>
          <span>Journey</span>
          <span>About</span>
        </div>

        <button>Explore</button>
      </nav>

      <section className="hero">

        <div className="hero-content">
          <p className="small-title">
            THE ART OF MOTION
          </p>

          <h1>
            CLASSIC
            <br />
            <span>IN MOTION</span>
          </h1>

          <p className="description">
            A journey where timeless design meets
            movement, elegance and technology.
          </p>

          <button className="hero-button">
            Start Journey →
          </button>
        </div>

        <div className="car-container">
          <CarScene />
        </div>

        <div className="scroll-text">
          SCROLL TO EXPLORE ↓
        </div>

      </section>

    </main>
  );
}

export default App;