import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_ALL_ENQUIRIES, DELETE_ALL_ENQUIRIES } from '../queries';
import './CustomAdmin.css';

function CustomAdmin() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { loading, error, data, refetch } = useQuery(GET_ALL_ENQUIRIES);
  
  const [deleteAll, { loading: deleting }] = useMutation(DELETE_ALL_ENQUIRIES, {
    onCompleted: () => {
      refetch();
      setShowConfirm(false);
    },
    onError: (err) => {
      console.error('Delete error:', err);
      alert('Failed to delete enquiries. Please try again.');
    },
  });

  if (loading) return (
    <div className="admin-loading">
      <div className="spinner"></div>
      <p>Loading enquiries...</p>
    </div>
  );
  
  if (error) {
    console.error('GraphQL error:', error);
    return (
      <div className="admin-error">
        <h3>❌ Error Loading Enquiries</h3>
        <p>Please ensure you are logged in and the server is running.</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  const enquiries = data?.allEnquiries || [];

  const filteredEnquiries = enquiries.filter(enq =>
    enq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enq.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enq.phone.includes(searchTerm)
  );

  const handleDeleteAll = () => {
    deleteAll({ variables: { confirm: 'yes' } });
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout/', { method: 'POST', credentials: 'include' });
      window.location.href = '/';
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Course name mapping
  const courseMap = {
    'dhtm': 'Diploma in Hospitality & Tourism',
    'dbm': 'Diploma in Business Management',
    'dcsm': 'Diploma in Chain & Supply',
    'adhtm': 'Advanced Diploma in Hospitality',
    'adbm': 'Advanced Diploma in Business',
    'adcsm': 'Advanced Diploma in Supply Chain',
  };

  return (
    <div className="custom-admin">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-logo">
          <img src="/logo.png" alt="Innovate Sphere Academy" />
          <div>
            <h1>Admin Dashboard</h1>
            <p>Innovate Sphere Academy</p>
          </div>
        </div>
        <div className="admin-actions">
          <span className="admin-welcome">👋 Welcome, Admin</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{enquiries.length}</div>
          <div className="stat-label">📋 Total Enquiries</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">6</div>
          <div className="stat-label">📚 Courses Offered</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {enquiries.length > 0 ? '✅' : '🟢'}
          </div>
          <div className="stat-label">System Status</div>
        </div>
      </div>

      {/* Controls */}
      <div className="admin-controls">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="🔍 Search by name, email, phone, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>
        <button
          className="clear-btn"
          onClick={() => setShowConfirm(true)}
          disabled={deleting || enquiries.length === 0}
        >
          {deleting ? '🗑️ Deleting...' : '🗑️ Delete All'}
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Course</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredEnquiries.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  {searchTerm ? 'No matching enquiries found' : 'No enquiries yet'}
                </td>
              </tr>
            ) : (
              filteredEnquiries.map((enq, index) => (
                <tr key={enq.id}>
                  <td>{index + 1}</td>
                  <td><strong>{enq.name}</strong></td>
                  <td>{enq.email}</td>
                  <td>{enq.phone}</td>
                  <td>
                    <span className="course-badge">
                      {courseMap[enq.course] || enq.course}
                    </span>
                  </td>
                  <td className="message-cell">
                    {enq.message || '—'}
                  </td>
                  <td>{new Date(enq.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        {/* Footer with count */}
        <div className="table-footer">
          <span>
            Showing {filteredEnquiries.length} of {enquiries.length} enquiries
          </span>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">⚠️</div>
            <h3>Confirm Deletion</h3>
            <p>
              Are you sure you want to delete all <strong>{enquiries.length}</strong> enquiries?
              <br />
              <span className="warning-text">This action cannot be undone!</span>
            </p>
            <div className="modal-actions">
              <button 
                className="modal-cancel" 
                onClick={() => setShowConfirm(false)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button 
                className="modal-danger" 
                onClick={handleDeleteAll}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Yes, Delete All'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomAdmin;