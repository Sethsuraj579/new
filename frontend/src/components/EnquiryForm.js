import React, { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { CREATE_ENQUIRY } from '../queries';

const COURSES = [
  { value: 'dhtm', label: 'Diploma in Hospitality and Tourism Management' },
  { value: 'dbm', label: 'Diploma in Business Management' },
  { value: 'dcsm', label: 'Diploma in Chain and Supply Management' },
  { value: 'adhtm', label: 'Advanced Diploma in Hospitality and Tourism Management' },
  { value: 'adbm', label: 'Advanced Diploma in Business Management' },
  { value: 'adcsm', label: 'Advanced Diploma in Chain and Supply Management' },
];

function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: COURSES[0].value,
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const [createEnquiry, { loading, error }] = useMutation(CREATE_ENQUIRY);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEnquiry({ variables: formData });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (submitted) {
    return (
      <div className="success-message">
        <h3>Thank you for your enquiry!</h3>
        <p>We will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="enquiry-form">
      <h2>Enquire Now</h2>
      <div className="form-group">
        <label>Full Name *</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Email *</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Phone *</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Course of Interest *</label>
        <select name="course" value={formData.course} onChange={handleChange}>
          {COURSES.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Message (optional)</label>
        <textarea name="message" value={formData.message} onChange={handleChange} rows="4"></textarea>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {error && <p className="error">Something went wrong. Please try again.</p>}
    </form>
  );
}

export default EnquiryForm;