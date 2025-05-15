import React, { useState } from 'react';
import ThreeDotsMenu from './ThreeDotsMenu';

const StudentRow = ({ student, selected, onCheck, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(student);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    const s1 = +editData.subject1, s2 = +editData.subject2, s3 = +editData.subject3;
    const total = s1 + s2 + s3;
    const avg = total / 3;
    let grade = 'Fail';
    if (avg >= 85) grade = 'A';
    else if (avg >= 70) grade = 'B';
    else if (avg >= 50) grade = 'C';
    onEdit(student.id, { ...editData, total, avg, grade });
    setIsEditing(false);
  };

  return (
    <tr>
      <td><input type="checkbox" checked={selected} onChange={() => onCheck(student.id)} /></td>
      <td>{isEditing ? <input name="name" value={editData.name} onChange={handleEditChange} /> : student.name}</td>
      <td>{isEditing ? <input name="roll" value={editData.roll} onChange={handleEditChange} /> : student.roll}</td>
      <td>
        {isEditing
          ? <>
              <input name="subject1" value={editData.subject1} onChange={handleEditChange} />
              <input name="subject2" value={editData.subject2} onChange={handleEditChange} />
              <input name="subject3" value={editData.subject3} onChange={handleEditChange} />
            </>
          : `${student.subject1}, ${student.subject2}, ${student.subject3}`}
      </td>
      <td>{student.total}</td>
      <td>{student.avg.toFixed(2)}</td>
      <td>{student.grade}</td>
      <td>
        <ThreeDotsMenu
          onEdit={() => setIsEditing(true)}
          onDelete={() => onDelete(student.id)}
          onSave={saveEdit}
          isEditing={isEditing}
        />
      </td>
    </tr>
  );
};

export default StudentRow;
