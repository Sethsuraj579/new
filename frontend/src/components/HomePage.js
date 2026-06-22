import React from 'react';
import EnquiryForm from './EnquiryForm';

function HomePage() {
  // Course list
  const courses = [
    { name: 'Diploma in Hospitality and Tourism Management', code: 'dhtm' },
    { name: 'Diploma in Business Management', code: 'dbm' },
    { name: 'Diploma in Chain and Supply Management', code: 'dcsm' },
    { name: 'Advanced Diploma in Hospitality and Tourism Management', code: 'adhtm' },
    { name: 'Advanced Diploma in Business Management', code: 'adbm' },
    { name: 'Advanced Diploma in Chain and Supply Management', code: 'adcsm' },
  ];

  // Fee data (from PDF)
  const feeItems = [
    { desc: 'Tuition Fees', amount: '4,250' },
    { desc: 'Examination Fees', amount: '300' },
    { desc: 'Course Material Fees', amount: '450' },
    { desc: 'College Administration Fee', amount: '100' },
    { desc: 'Fee Protection Scheme', amount: '200' },
    { desc: 'Student Pass Application & Issuance', amount: '180' },
    { desc: 'Medical Insurance', amount: '120' },
    { desc: 'Subtotal', amount: '5,600', bold: true },
    { desc: 'GST (9%)', amount: '504' },
    { desc: 'Total Course Fees Payable', amount: '6,104', bold: true },
  ];

  const miscFees = [
    { item: 'Student Pass Renewal', amount: '275' },
    { item: 'College Application Fee', amount: '350' },
    { item: 'Medical Check-Up', amount: '55' },
    { item: 'Re-Mark Examination', amount: '164' },
    { item: 'Re-Examination / Late Entry', amount: '109' },
    { item: 'Graduation Fee', amount: 'Up to 540' },
    { item: 'Late Payment Fee', amount: '109' },
    { item: 'Hard Copy Transcript', amount: '55' },
    { item: 'Certificate Courier', amount: '71' },
    { item: 'College Uniform', amount: '21.80' },
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <h1>INNOVATE SPHERE ACADEMY</h1>
        <p className="tagline">Empowering Students for Global Careers</p>
        <p className="subtag">Industry‑focused education with practical learning</p>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About Innovate Sphere Academy</h2>
        <p>
          Innovate Sphere Academy is dedicated to delivering industry‑focused education that combines
          academic excellence with practical learning. Our programmes are designed to equip students
          with the knowledge, confidence, and professional skills required to succeed in the global
          hospitality and service industries.
        </p>
        <p>
          Our faculty members are experienced educators and industry professionals with extensive
          backgrounds in hospitality, tourism, business, and customer service. They provide
          personalised guidance, practical training, case studies, and real‑world insights to ensure
          every student develops the skills demanded by international employers.
        </p>
      </section>

      {/* Courses Section */}
      <section className="courses">
        <h2>Our Programmes</h2>
        <p className="course-intro">
          All programmes are <strong>6 months of coursework</strong> followed by a <strong>6‑month internship</strong>,
          giving you hands‑on industry experience.
        </p>
        <div className="course-grid">
          {courses.map((c) => (
            <div className="course-card" key={c.code}>
              <h3>{c.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Support Services */}
      <section className="support">
        <h2>Student Support Services</h2>
        <ul>
          <li>Dedicated Student Support Team – academic and personal guidance</li>
          <li>Student Pass application and renewal assistance</li>
          <li>Career counselling and employability guidance</li>
          <li>Friendly multilingual administrative support</li>
          <li>Orientation programmes for new international students</li>
          <li>Academic counselling and progress monitoring</li>
          <li>Safe, inclusive and supportive learning environment</li>
          <li>Fast response to student enquiries and documentation requests</li>
        </ul>
      </section>

      {/* Fee Structure */}
      <section className="fees">
        <h2>Course Fees</h2>
        <table className="fee-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Fee (SGD)</th>
            </tr>
          </thead>
          <tbody>
            {feeItems.map((item, idx) => (
              <tr key={idx} className={item.bold ? 'bold-row' : ''}>
                <td>{item.desc}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Miscellaneous Fees</h3>
        <table className="fee-table misc">
          <thead>
            <tr>
              <th>Item</th>
              <th>Fee (SGD)</th>
            </tr>
          </thead>
          <tbody>
            {miscFees.map((item, idx) => (
              <tr key={idx}>
                <td>{item.item}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="fee-note">* Fees are subject to change without prior notice.</p>
      </section>

      {/* Enquiry Form */}
      <section className="enquiry-section">
        <h2>Enquire Now</h2>
        <EnquiryForm />
      </section>
    </div>
  );
}

export default HomePage;