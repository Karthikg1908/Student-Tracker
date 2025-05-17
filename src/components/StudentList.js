import React, { useEffect, useState, useMemo } from 'react';
import StudentRow from './StudentRow';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(stored);
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  }, [students, search]);

  const handleDelete = (id) => {
    const filtered = students.filter(s => s.id !== id);
    setStudents(filtered);
    localStorage.setItem('students', JSON.stringify(filtered));
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
    setSelected(e.target.checked ? students.map(s => s.id) : []);
  };

  return (
    <div className="list">
      <h2>Student List</h2>
      <input
        type="text"
        placeholder="Search by name..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <div className="controls">
        <button onClick={deleteSelected} disabled={!selected.length}>Delete Selected</button>
      </div>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" onChange={handleSelectAll} checked={selected.length === students.length} /></th>
            <th>Name</th><th>Roll</th><th>Subjects</th>
            <th>Total</th><th>Average</th><th>Grade</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(student => (
            <StudentRow
              key={student.id}
              student={student}
              selected={selected.includes(student.id)}
              onCheck={handleCheck}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
