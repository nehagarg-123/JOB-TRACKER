import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import { useEffect, useState } from 'react';
import logo from '../assets/letter-j.png';
import updatefinal from '../assets/updatefinal.png'; // Import the background image

const UpdateTask = () => {
  const { id } = useParams();
  const [job, setJob] = useState({
    company: '',
    position: '',
    status: 'pending',
    statusDate: '',
  });
  const navigate = useNavigate();

  const editJob = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const dataObj = Object.fromEntries(data);

    try {
      await axiosInstance.patch(`/jobs/${id}`, dataObj);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  const deleteJob = async () => {
    try {
      await axiosInstance.delete(`/jobs/${id}`);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getJob = async () => {
      try {
        const res = await axiosInstance.get(`/jobs/${id}`);
        setJob(res.data.job);
      } catch (err) {
        console.log(err);
      }
    };

    getJob();
  }, [id]);

  return (
    // Main container that applies the background image
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${updatefinal})`, // Use the imported image variable here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
          backgroundColor: "rgba(242, 239, 239, 0.6)", // White fade
          zIndex: 0,
        }}
      ></div>
      {/* Frosted glass form container */}
      <div
        style={{
          maxWidth: '320px', // Adjusted to match the dashboard form size
          width: '100%',
          padding: '25px', // Slightly reduced padding for better fit
          backgroundColor: 'rgba(111, 119, 161, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }}
      >
        <form className="text-center" onSubmit={editJob}>
          <Link to="/dashboard">
            <img className="mb-4" src={logo} height="60px" alt="Logo" />
          </Link>

          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="text"
              name="company"
              id="company"
              placeholder="Company"
              defaultValue={job.company}
              required
            />
            <label htmlFor="company">Company</label>
          </div>

          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="text"
              name="position"
              id="position"
              placeholder="Position"
              defaultValue={job.position}
              required
            />
            <label htmlFor="position">Position</label>
          </div>

          <div className="form-floating mb-3">
            <select
              name="status"
              id="status"
              className="form-select"
              defaultValue={job.status}
            >
              <option value="pending">Pending</option>
              <option value="Online-Assessment">Online-Assessment</option>
              <option value="interview">Interview</option>
              <option value="declined">Declined</option>
            </select>
            <label htmlFor="status">Status</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="date"
              name="statusDate"
              id="statusDate"
              className="form-control"
              value={job.statusDate ? job.statusDate.slice(0, 10) : ''}
              onChange={(e) => setJob({ ...job, statusDate: e.target.value })}
            />
            <label htmlFor="statusDate">Date</label>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="btn w-100 btn-lg mb-2"
              style={{
                backgroundColor: '#5899f2ff',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              Update Job
            </button>
            <button
              type="button"
              onClick={deleteJob}
              className="btn btn-danger w-100 btn-lg"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
