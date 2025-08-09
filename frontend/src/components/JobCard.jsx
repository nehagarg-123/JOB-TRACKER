import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const formattedDate = job.statusDate
    ? new Date(job.statusDate).toLocaleDateString()
    : 'Not set';

  return (
    // The main container that holds everything.
    <div
      style={{
        backgroundColor: '#f0f2f5', // Neutral background for the entire card
        borderRadius: '10px',
        padding: '15px',
        minWidth: '280px',
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* First box for ONLY the Company */}
      <div
        style={{
          backgroundColor: '#7c86e1ff', // Blue background
          color: 'white',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '10px', // Adds space between the two boxes
        }}
      >
        <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.2rem' }}>
          {job.company}
        </p>
      </div>

      {/* Second box for Position, Status, and Date */}
      <div
        style={{
          backgroundColor: '#ffffff', // White background
          color: '#080505ff',
          borderRadius: '8px',
          padding: '10px',
          marginBottom: '15px', // Adds space above the button
        }}
      >
        <p style={{ margin: '0 0 5px 0' }}>
          <strong>Position:</strong> {job.position}
        </p>
        <p style={{ margin: '0 0 5px 0' }}>
          <strong>Status:</strong> {job.status}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Date:</strong> {formattedDate}
        </p>
      </div>

      {/* Edit Button */}
      <button
        onClick={() => navigate(`/jobs/${job._id}/edit`)}
        className="btn btn-sm w-75"
        style={{
          backgroundColor: '#89909cff', // Dark contrast color for the button
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
