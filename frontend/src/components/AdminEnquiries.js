import React from 'react';
import { useQuery,useMutation } from '@apollo/client/react';
import { GET_ALL_ENQUIRIES, DELETE_ALL_ENQUIRIES } from '../queries';

function AdminEnquiries() {
  const { loading, error, data, refetch } = useQuery(GET_ALL_ENQUIRIES);
  const [deleteAll] = useMutation(DELETE_ALL_ENQUIRIES);
  const [message, setMessage] = React.useState(false); 
  
  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to delete all enquiries? This action cannot be undone.')) {
      try {
        const result = await deleteAll();
        setMessage(result.data.deleteAllEnquiries.message);
        refetch();
      } catch (error) {
        console.error(error);
        setMessage('Error deleting enquiries.' + error.message);
      }
    }
  };

  if (loading) return <p>Loading enquiries...</p>;
  if (error) {
    console.error(error);
    return <p>Error loading enquiries. Please ensure you are logged in.</p>;
  }

  const enquiries = data?.allEnquiries || [];

  return (
    <div className="admin-enquiries">
        <div className = "admin-header">
      <h2>Student Enquiries</h2>
      <button className="clear-btn"
      onClick={handleClearAll}
      disabled={enquiries.length === 0}
      >
        Clear All
      </button>
        </div>
        {message && <p className="info-message">{message}</p>}
      {enquiries.length === 0 ? (
        <p>No enquiries yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Course</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map(enq => (
              <tr key={enq.id}>
                <td>{enq.name}</td>
                <td>{enq.email}</td>
                <td>{enq.phone}</td>
                <td>{enq.course}</td>
                <td>{enq.message}</td>
                <td>{new Date(enq.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminEnquiries;