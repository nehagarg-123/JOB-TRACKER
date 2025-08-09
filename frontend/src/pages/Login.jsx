import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/letter-j.png'
import axios from 'axios'
import signupbg from '../assets/signupbg.png'
import { useState } from 'react'

const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const dataObj = Object.fromEntries(data)

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/v1/auth/login`,
        dataObj
      )
      setError(false)
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
      setError(true)
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url(${signupbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center', // vertical center
        justifyContent: 'center', // horizontal center
        padding: '20px',
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(165, 168, 193, 0.6)", // White fade
          zIndex: 0,
        }}
      ></div>
      <form
        style={{
          maxWidth: '320px',
          width: '100%',
          background: 'rgba(102, 98, 146, 0.95)',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: `
            0 10px 20px rgba(0, 0, 0, 0.2), 
            0 6px 6px rgba(0, 0, 0, 0.15),   
            inset 0 1px 2px rgba(255, 255, 255, 0.4)
          `,
          transform: 'translateY(-5px)',
          transition: 'all 0.3s ease',
          textAlign: 'center',
        }}
        onSubmit={handleLogin}
      >
        <Link to="/">
          <img className="mt-2" src={logo} height="72px" />
        </Link>
        <h1
          className="mt-3 mb-3 fw-normal"
          style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '600' }}
        >
          Please log in
        </h1>
        <input
          type="email"
          name="email"
          className="form-control mb-3"
          placeholder="Email Address"
          required
          autoFocus
        />
        <input
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Password"
          required
        />
        <div className="mt-3">
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: '#4a90e2', // matches theme
              color: '#fff',
              fontWeight: 'bold',
              border: 'none',
            }}
          >
            Log in
          </button>
          <p className="mt-3">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
        {error && (
          <div className="alert alert-danger mt-3">
            Incorrect email or password
          </div>
        )}
      </form>
    </div>
  )
}

export default Login
