import { Link } from "react-router-dom";
import board from "../assets/Whiteboard.png"; // background image

const LandingPage = () => {
  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-center text-white"
      style={{
        backgroundImage: `url(${board})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Faded overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(242, 239, 239, 0.6)", // White fade
          zIndex: 0,
        }}
      ></div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
        <h1
          className="fw-bold"
          style={{
           fontSize: '4rem',
          fontWeight: 'bold',
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: '2px',
          textShadow: '2px 2px 8px rgba(197, 175, 237, 0.5)',
           color: "#363333ff", // solid black for contrast
          }}
        >
          JOB TRACKER
        </h1>

        <p
          style={{
            fontSize: "1.5rem",
           fontWeight: 'bold',
          
          letterSpacing: '2px',
          textShadow: '2px 2px 8px rgba(146, 101, 188, 0.5)',
           backgroundColor: "#ced3e0ff",
            color: "#04045dff",
            
            borderRadius: "5px",
             // dark grey for readability
             padding: "5px 15px", // Added padding for better spacing

          // This creates the white outline on the text
            WebkitTextStroke: '0.9px white', 
            textStroke: '4px white'    
          }}
        >
          From job creation to progress tracking
        </p>

       

        <Link
          to="/signup"
          className="btn px-5 py-3"
          style={{
            fontSize: "1.2rem",
            borderRadius: "30px",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
            backgroundColor: "#1E3A8A", // blue tone that matches corporate logos
            color: "#fff",
            fontWeight: "bold",
            marginTop: "40px",
          }}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
