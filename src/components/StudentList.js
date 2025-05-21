import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentRow from './StudentRow';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const [sortOption, setSortOption] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(stored);
  }, []);

  const filteredStudents = useMemo(() => {
    let result = [...students].filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sortOption === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === 'marks') {
      result.sort((a, b) => b.total - a.total);
    } else if (sortOption === 'marks-asc') {
      result.sort((a, b) => a.total - b.total);
    }

    return result;
  }, [students, search, sortOption]);

  const handleDelete = (id) => {
    const filtered = students.filter(s => s.id !== id);
    setStudents(filtered);
    localStorage.setItem('students', JSON.stringify(filtered));
    setSelected(prev => prev.filter(sid => sid !== id));
  };

  const handleEdit = (id, updatedData) => {
    const updated = students.map(s => s.id === id ? updatedData : s);
    setStudents(updated);
    localStorage.setItem('students', JSON.stringify(updated));
  };

  const handleCheck = (id) => {
    setSelected(prev => prev.includes(id)
      ? prev.filter(i => i !== id)
      : [...prev, id]);
  };

  const deleteSelected = () => {
    const updated = students.filter(s => !selected.includes(s.id));
    setStudents(updated);
    localStorage.setItem('students', JSON.stringify(updated));
    setSelected([]);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(filteredStudents.map(s => s.id));
    } else {
      setSelected([]);
    }
  };

  const generateCSV = () => {
    const header = ['Name', 'Roll', 'Subject 1', 'Subject 2', 'Subject 3', 'Total', 'Average', 'Grade'];
    const rows = filteredStudents.map(student => [
      `"${student.name}"`,
      `"${student.roll}"`,
      student.subject1,
      student.subject2,
      student.subject3,
      student.total,
      student.avg.toFixed(2),
      student.grade
    ]);

    const csvContent = [
      header.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'students.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="list">
      <div className="list-header">
        <h2>Student List</h2>
        <button onClick={() => navigate('/')} className="add-button">Add Student</button>
        <button onClick={generateCSV} className="csv-button" disabled={!filteredStudents.length}>Download CSV</button>
      </div>

      <div className="top-controls">
        <input
          type="text"
          placeholder="Search by name..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />

        <div className="sort-controls">
          <label>Sort by: </label>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="">None</option>
            <option value="name">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="marks">Marks (High to Low)</option>
            <option value="marks-asc">Marks (Low to High)</option>
          </select>
        </div>

        <button onClick={deleteSelected} disabled={!selected.length}>Delete Selected</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selected.length > 0 && selected.length === filteredStudents.length}
                indeterminate={selected.length > 0 && selected.length < filteredStudents.length ? 'true' : undefined}
              />
            </th>
            <th>Name</th><th>Roll</th><th>Subjects</th>
            <th>Total</th><th>Average</th><th>Grade</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length === 0 ? (
            <tr><td colSpan="8" style={{ textAlign: 'center' }}>No students found.</td></tr>
          ) : (
            filteredStudents.map(student => (
              <StudentRow
                key={student.id}
                student={student}
                selected={selected.includes(student.id)}
                onCheck={handleCheck}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
