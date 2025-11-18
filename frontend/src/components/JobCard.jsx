import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const formattedDate = job.statusDate
    ? new Date(job.statusDate).toLocaleDateString()
    : 'Not set';

  // --- Link Logic (Already perfect) ---
  const hasLink = job.jobLink && job.jobLink.startsWith('http');

  const CompanyLink = hasLink ? (
    <a
      href={job.jobLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        margin: 0,
        fontWeight: 'bold',
        fontSize: '1.2rem',
        color: 'white',
        textDecoration: 'underline',
      }}
    >
      {job.company}
    </a>
  ) : (
    <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.2rem' }}>
      {job.company}
    </p>
  );

  // --- Logic for Notes ---
  const hasNotes = job.notes && job.notes.trim().length > 0;
  
  // --- 1. NEW LOGIC FOR RESUME ---
  // Check if a resume URL exists
  const hasResume = job.resumeUrl && job.resumeUrl.startsWith('http');
  // --- END NEW LOGIC ---

  return (
    <div
      style={{
        backgroundColor: '#f0f2f5',
        borderRadius: '10px',
        padding: '15px',
        minWidth: '280px',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* First box (Blue) */}
      <div
        style={{
          backgroundColor: '#7c86e1ff',
          color: 'white',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '10px',
        }}
      >
        {CompanyLink}
      </div>

      {/* Second box (White) */}
      <div
        style={{
          backgroundColor: '#ffffff',
          color: '#080505ff',
          borderRadius: '8px',
          padding: '10px',
          marginBottom: '15px',
        }}
      >
        <p style={{ margin: '0 0 5px 0' }}>
          <strong>Position:</strong> {job.position}
        </p>
        <p style={{ margin: '0 0 5px 0' }}>
          <strong>Status:</strong> {job.status}
        </p>
        <p style={{ margin: '0 0 5px 0' }}>
          <strong>Form_filled:</strong> {job.Have_Filled}
        </p>
        <p style={{ margin: '0 0 5px 0' }}>
          <strong>Date:</strong> {formattedDate}
        </p>

        {/* Clickable Notes Text */}
        {hasNotes && (
          <p
            onClick={() => navigate(`/jobs/${job._id}/edit`)}
            style={{
              margin: '0 0 5px 0', // Added margin
              color: '#5899f2ff', 
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Notes
          </p>
        )}
        
        {/* --- 2. NEW CLICKABLE RESUME LINK --- */}
        {/* If 'hasResume' is true, show this link */}
        {hasResume && (
          <a
            href={job.resumeUrl} // Links directly to the resume file
            target="_blank"
            rel="noopener noreferrer"
            style={{
              margin: 0,
              color: '#0d6efd', // A different blue color
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            View Resume
          </a>
        )}
        {/* --- END NEW RESUME --- */}
        
      </div>

      {/* Edit Button */}
      <button
        onClick={() => navigate(`/jobs/${job._id}/edit`)}
        className="btn btn-sm w-75"
        style={{
          backgroundColor: '#89909cff',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default JobCard;
