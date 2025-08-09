import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/letter-j.png';
import JobCard from '../components/JobCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search input

  const addJob = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const dataObj = Object.fromEntries(data);
    form.reset();
    try {
      const res = await axiosInstance.post('/jobs', dataObj);
      const newJobs = [...jobs, res.data.job];
      setJobs(newJobs);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await axiosInstance.get('/jobs');
        setJobs(res.data.jobs);
      } catch (err) {
        console.log(err);
      }
    };

    getJobs();
  }, []);

  // Filter jobs based on the search query
  const filteredJobs = jobs.filter(
    (job) =>
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <nav
        className="navbar fixed-top"
        style={{
          backgroundColor: 'rgba(30, 30, 30, 0.95)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <a href="#" className="navbar-brand text-white">
            <img src={logo} width="40px" alt="Logo" />
          </a>
          <Link
            to="/"
            className="btn btn-danger btn-sm"
            onClick={handleLogout}
          >
            Log out
          </Link>
        </div>
      </nav>

      {/* Section 1: "Add Job" form */}
      <div
        style={{
          backgroundColor: '#c9cfdaff',
          paddingTop: '7rem',
          paddingBottom: '3rem',
        }}
      >
        <div
          style={{
            maxWidth: '320px',
            margin: 'auto',
            background: '#f9f9f9',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
          }}
        >
           <h1
              className="mt-3 mb-4 fw-normal text-center"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#495057',
                letterSpacing: '0.5px',
              }}
            >
              Add Company & Position
            </h1>
          <form onSubmit={addJob}>
            <input
              className="form-control mb-3"
              type="text"
              name="company"
              placeholder="Company"
              required
            />
            <input
              className="form-control mb-3"
              type="text"
              name="position"
              placeholder="Position"
              required
            />
            <div>
              <button
                type="submit"
                className="btn w-100"
                style={{
                  backgroundColor: '#5899f2ff',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Section 2: "Job Cards" list with a new background */}
      <div
        style={{
          backgroundColor: 'rgba(139, 147, 182, 0.95)',
          padding: '1rem 0',
          minHeight: '50vh',
        }}
      >
        {/* Search Bar Container */}
        <div className="container mb-4" style={{ maxWidth: '400px' }}>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search by company or position..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            }}
          />
        </div>

        {/* Job Cards Container */}
        <div className="container d-flex gap-4 flex-wrap justify-content-center">
          {filteredJobs.map((job) => ( // Use the filtered list here
            <div key={job._id}>
              <JobCard job={job} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
