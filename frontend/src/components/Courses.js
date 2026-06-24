import React from 'react';
import './Courses.css';

const courseData = [
  {
    id: 'dhtm',
    title: 'Diploma in Hospitality and Tourism Management',
    duration: '6 months course + 6 months internship',
    description: 'Prepare for rewarding careers in hotels, resorts, restaurants, airlines, cruise lines, tourism organisations, and event management.',
    modules: ['Hotel Operations', 'Food & Beverage Management', 'Front Office Operations', 'Housekeeping', 'Customer Service Excellence', 'Tourism Management', 'Leadership & Communication', 'Marketing & Business Management'],
    fees: 'SGD 6,104 (including GST)',
  },
  {
    id: 'dbm',
    title: 'Diploma in Business Management',
    duration: '6 months course + 6 months internship',
    description: 'Build a strong foundation in business principles, management strategies, and entrepreneurial skills for a successful career.',
    modules: ['Business Communication', 'Marketing Management', 'Financial Accounting', 'Human Resource Management', 'Organisational Behaviour', 'Business Law', 'Strategic Management'],
    fees: 'SGD 6,104 (including GST)',
  },
  {
    id: 'dcsm',
    title: 'Diploma in Chain and Supply Management',
    duration: '6 months course + 6 months internship',
    description: 'Master the logistics, procurement, and supply chain strategies essential for global trade and operations.',
    modules: ['Supply Chain Fundamentals', 'Logistics Management', 'Procurement & Sourcing', 'Inventory Management', 'Transportation & Distribution', 'Global Supply Chain', 'Risk Management'],
    fees: 'SGD 6,104 (including GST)',
  },
  {
    id: 'adhtm',
    title: 'Advanced Diploma in Hospitality and Tourism Management',
    duration: '6 months course + 6 months internship',
    description: 'Deepen your expertise in hospitality leadership, strategic management, and advanced service delivery.',
    modules: ['Advanced Hotel Operations', 'Strategic Marketing in Hospitality', 'Revenue Management', 'Event Planning & Management', 'Tourism Policy & Planning', 'Hospitality Law', 'Leadership in Service'],
    fees: 'SGD 6,104 (including GST)',
  },
  {
    id: 'adbm',
    title: 'Advanced Diploma in Business Management',
    duration: '6 months course + 6 months internship',
    description: 'Elevate your business acumen with advanced topics in analytics, innovation, and global business strategy.',
    modules: ['Business Analytics', 'Innovation & Entrepreneurship', 'International Business', 'Corporate Finance', 'Strategic Leadership', 'Change Management', 'Business Ethics'],
    fees: 'SGD 6,104 (including GST)',
  },
  {
    id: 'adcsm',
    title: 'Advanced Diploma in Chain and Supply Management',
    duration: '6 months course + 6 months internship',
    description: 'Gain strategic insights into complex supply chains, sustainability, and digital transformation in logistics.',
    modules: ['Advanced Supply Chain Strategy', 'Sustainable Supply Chains', 'Digital Logistics', 'Supply Chain Analytics', 'Global Sourcing & Procurement', 'Supplier Relationship Management', 'Project Management'],
    fees: 'SGD 6,104 (including GST)',
  },
];

function Courses() {
  return (
    <div className="courses-page">
      <h1>Our Programmes</h1>
      <p className="courses-intro">
        All programmes are <strong>6 months of coursework</strong> followed by a <strong>6‑month internship</strong>,
        giving you hands‑on industry experience.
      </p>

      <div className="course-grid-details">
        {courseData.map((course) => (
          <div className="course-card-details" key={course.id}>
            <h2>{course.title}</h2>
            <p className="course-duration">⏱️ {course.duration}</p>
            <p className="course-description">{course.description}</p>
            <div className="course-modules">
              <strong>Modules:</strong>
              <ul>
                {course.modules.map((module, idx) => (
                  <li key={idx}>{module}</li>
                ))}
              </ul>
            </div>
            <p className="course-fees">💰 Fees: {course.fees}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;