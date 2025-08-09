import { Link } from 'react-router-dom'
import logo from '../assets/letter-j.png'

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div className="container">
        <a href="#" className="navbar-brand">
          <img src={logo} width="40px" alt="Logo" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-end gap-md-2"
          id="navbarNav"
        >
         <Link
        to="/signup"
      className="btn btn-lg d-block mt-4 mb-3 mt-md-0 mb-md-0"
       style={{
         backgroundColor: "#f0f1f3ff", // matches landing page blue
         color: "#392a57ff", // white text
         fontWeight: "bold",
          padding: "10px 15px",
         boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
         >
       Sign up
      </Link>
          <Link
            to="/login"
            className="btn btn-lg btn-outline-light d-block mb-4 mb-md-0"
            style={{
         // matches landing page blue
          color: "#e7e5e9ff", // white text
          fontWeight: "bold",
          padding: "10px 15px",
         boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        }}
          >
            Log in
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
