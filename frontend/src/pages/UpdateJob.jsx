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
    Have_Filled: 'No',
    statusDate: '',
    jobLink: '',
    notes: '',
    resumeUrl: '', // <-- 1. Add resumeUrl to state
  });
  const [showNotes, setShowNotes] = useState(false);

  // --- 2. ADD NEW STATE FOR THE FILE ---
  const [selectedFile, setSelectedFile] = useState(null);
  // --- END NEW STATE ---

  const navigate = useNavigate();

  // --- 3. THIS FUNCTION IS COMPLETELY REWRITTEN ---
  // We must change this function because Object.fromEntries(data)
  // does NOT work for file uploads.
  const editJob = async (e) => {
    e.preventDefault();

    // We have to build the FormData object manually
    const formData = new FormData();

    // Get all the text fields from the form
    const form = e.currentTarget;
    formData.append('company', form.company.value);
    formData.append('position', form.position.value);
    formData.append('jobLink', form.jobLink.value);
    formData.append('status', form.status.value);
    formData.append('Have_Filled', form.Have_Filled.value);
    formData.append('statusDate', form.statusDate.value);
    
    // Handle notes being hidden or visible
    if (showNotes && form.notes) {
      formData.append('notes', form.notes.value);
    } else {
      formData.append('notes', job.notes); // Send the original notes
    }


    // Check if a new file was selected
    if (selectedFile) {
      // 'resume' MUST match the name in your backend route
      formData.append('resume', selectedFile);
    }

    try {
      // We send the 'formData' object directly.
      // Axios will automatically set the correct headers for file uploads.
      await axiosInstance.patch(`/jobs/${id}`, formData);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };
  // --- END FUNCTION MODIFICATION ---

  const deleteJob = async () => {
    try {
      await axiosInstance.delete(`/jobs/${id}`);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  // --- 4. NEW FUNCTION TO HANDLE FILE SELECTION ---
  const handleFileChange = (e) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };
  // --- END NEW FUNCTION ---

  useEffect(() => {
    const getJob = async () => {
      try {
        const res = await axiosInstance.get(`/jobs/${id}`);
        setJob(res.data.job);
        if (res.data.job.notes) {
          setShowNotes(true);
        }
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
        backgroundImage: `url(${updatefinal})`,
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
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(242, 239, 239, 0.6)', // White fade
          zIndex: 0,
        }}
      ></div>
      {/* Frosted glass form container */}
      <div
        style={{
          maxWidth: '320px',
          width: '100%',
          padding: '25px',
          backgroundColor: 'rgba(111, 119, 161, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        }}
      >
        {/* --- 5. IMPORTANT: ADD encType to FORM --- */}
        <form
          className="text-center"
          onSubmit={editJob}
          encType="multipart/form-data"
        >
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
            <input
              className="form-control"
              type="url"
              name="jobLink"
              id="jobLink"
              placeholder="Job Link"
              defaultValue={job.jobLink}
            />
            <label htmlFor="jobLink">Job Link</label>
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
            <select
              name="Have_Filled"
              id="Have_Filled"
              className="form-select"
              defaultValue={job.Have_Filled}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            <label htmlFor="Form_filled">Have_Filled</label>
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

          <button
            type="button"
            className="btn btn-secondary w-100 mb-2"
            onClick={() => setShowNotes(!showNotes)}
          >
            {showNotes ? 'Hide Notes' : 'Show / Add Notes'}
          </button>

          {showNotes && (
            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                name="notes"
                id="notes"
                placeholder="Notes"
                defaultValue={job.notes}
                style={{ height: '100px' }}
              ></textarea>
              <label htmlFor="notes">Notes</label>
            </div>
          )}

          {/* --- 6. NEW RESUME UPLOAD FIELD --- */}
          <div className="mb-3">
            <label
              htmlFor="resume"
              className="form-label w-100"
              style={{ color: 'white', fontWeight: 'bold', textAlign: 'left' }}
            >
              Upload Resume (PDF/DOCX)
            </label>
            <input
              className="form-control"
              type="file"
              id="resume"
              name="resume" // This name 'resume' MUST match the backend
              accept=".pdf,.doc,.docx" // Only allow these file types
              onChange={handleFileChange}
            />

            {/* 7. Show a link to the current resume if it exists */}
            {job.resumeUrl && !selectedFile && (
              <div className="mt-2 text-start">
                <a
                  href={job.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-info btn-sm"
                >
                  View Current Resume
                </a>
              </div>
            )}

            {/* Show the name of the newly selected file */}
            {selectedFile && (
              <div className="mt-2 text-white text-start">
                Selected: {selectedFile.name}
              </div>
            )}
          </div>
          {/* --- END NEW RESUME SECTION --- */}

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
