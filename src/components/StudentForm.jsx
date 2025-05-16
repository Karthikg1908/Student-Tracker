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
    if (avg >= 85) grade = 'A';
    else if (avg >= 70) grade = 'B';
    else if (avg >= 40) grade = 'C';
    return { total, avg, grade };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { subject1, subject2, subject3 } = formData;
    const s1 = +subject1, s2 = +subject2, s3 = +subject3;
    const { total, avg, grade } = calculateResults(s1, s2, s3);

    const newStudent = {
      ...formData,
      id: Date.now(),
      total,
      avg,
      grade
    };

    const stored = JSON.parse(localStorage.getItem('students')) || [];
    stored.push(newStudent);
    localStorage.setItem('students', JSON.stringify(stored));
    navigate('/list');
  };

  return (
    <div className="form-container">
      <h2>Student Data</h2>

      <form className="form" onSubmit={handleSubmit}>
        {['name', 'roll', 'subject1', 'subject2', 'subject3'].map(field => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field === 'roll' ? 'USN' : field.toUpperCase()}
            value={formData[field]}
            onChange={handleChange}
            required
          />
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
