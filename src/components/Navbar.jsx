function Navbar() {
  const scrollToJourney = () => {
    document
      .getElementById("journey")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <nav className="navbar">

      <h2 className="logo">
        BEYOND
      </h2>

      <div className="nav-links">

        <a href="#home">
          Home
        </a>

        <button onClick={scrollToJourney}>
          Journey
        </button>

      </div>

    </nav>
  );
}

export default Navbar;