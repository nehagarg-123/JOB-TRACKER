import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/letter-j.png'
import signupbg from '../assets/signupbg.png'
import axios from 'axios'
import { useState } from 'react'

const Signup = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const dataObj = Object.fromEntries(data)

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/v1/auth/register`,
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
      className="text-center mt-5"
      style={{
        backgroundImage: `url(${signupbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '50px',
      }}
    >
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
      <form
        style={{
         maxWidth: '320px',
  margin: 'auto',
  background: 'rgba(139, 147, 182, 0.95)',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: `
    0 10px 20px rgba(0, 0, 0, 0.2), /* Deep outer shadow for depth */
    0 6px 6px rgba(0, 0, 0, 0.15),   /* Softer lower shadow */
    inset 0 1px 2px rgba(255, 255, 255, 0.4) /* Inner light for raised look */
  `,
  transform: 'translateY(-5px)', /* Slight lift */
  transition: 'all 0.3s ease' /* Smooth hover animation */
        }}
        onSubmit={handleSignup}
      >
        <Link to="/">
          <img className="mt-2" src={logo} height="72px" />
        </Link>
        <h1
          style={{
            fontSize: '1.6rem',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '500',
          }}
          className="mt-3 mb-3"
        >
          Please Sign Up
        </h1>
        <input
          type="text"
          name="name"
          className="form-control mb-2"
          placeholder="Name"
          maxLength={50}
          required
          autoFocus
        />
        <input
          type="email"
          name="email"
          className="form-control mb-2"
          placeholder="Email Address"
          required
        />
        <input
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Password"
          minLength={6}
          required
        />
        <button
          type="submit"
          className="btn w-100"
          style={{
            backgroundColor: '#5b9eebff',
            color: '#fff',
            fontWeight: '500',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
          }}
        >
          Sign Up
        </button>
        <p className="mt-2 ">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
      {error && (
        <div className="alert alert-danger col-6 col-md-2 m-auto mt-3">
          Email already exists
        </div>
      )}
    </div>
  )
}

export default Signup
