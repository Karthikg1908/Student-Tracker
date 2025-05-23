import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    subject1: '',
    subject2: '',
    subject3: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateResults = (s1, s2, s3) => {
    const total = s1 + s2 + s3;
    const avg = total / 3;
    let grade = 'Fail';
    if (avg >= 75) grade = 'A';
    else if (avg >= 60) grade = 'B';
    else if (avg >= 35) grade = 'C';
    return { total, avg, grade };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { subject1, subject2, subject3 } = formData;
    const s1 = Number(subject1), s2 = Number(subject2), s3 = Number(subject3);

    if ([s1, s2, s3].some(score => score < 0 || score > 100 || isNaN(score))) {
      alert("❌ Marks should be numbers between 0 and 100");
      return;
    }

    const { total, avg, grade } = calculateResults(s1, s2, s3);

    const newStudent = {
      ...formData,
      subject1: s1,
      subject2: s2,
      subject3: s3,
      id: Date.now(),
      total,
      avg,
      grade,
      tags: [],
      pinned: false,
      important: false,
    };

    const stored = JSON.parse(localStorage.getItem('students')) || [];
    stored.push(newStudent);
    localStorage.setItem('students', JSON.stringify(stored));

    alert("✅ Student added successfully!");
    navigate('/list');
  };

  const labels = {
    name: 'Student Name',
    roll: 'USN',
    subject1: 'Subject 1 Marks',
    subject2: 'Subject 2 Marks',
    subject3: 'Subject 3 Marks'
  };

  const placeholderExamples = {
    name: 'Karthi',
    roll: '407',
    subject1: '80',
    subject2: '75',
    subject3: '100'
  };

  return (
    <div className="form-container">
      <h2>Student Record Submission</h2>

      <form className="form" onSubmit={handleSubmit}>
        <h3 style={{ textAlign: 'center', fontSize: '26px' }}> Enter the Students Details </h3>

        {Object.keys(formData).map((field) => (
          <div key={field} className="form-group">
            <label htmlFor={field}>{labels[field]}</label>
            <input
              id={field}
              name={field}
              type={field.startsWith('subject') ? 'number' : 'text'}
              placeholder={placeholderExamples[field]}
              value={formData[field]}
              onChange={handleChange}
              required
              {...(field.startsWith('subject') ? { min: 0, max: 100 } : {})}
            />
          </div>
        ))}

        <div className="form-actions">
          <button type="submit">Add Student</button>
          <Link to="/list" className="nav-link right-link">Go to Students List</Link>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
