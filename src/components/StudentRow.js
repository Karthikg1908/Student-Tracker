import React, { useState, useRef, useEffect } from 'react';
import ThreeDotsMenu from './ThreeDotsMenu';

const StudentRow = ({ student, selected, onCheck, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...student });
  const [tags, setTags] = useState(student.tags || []);
  const [pinned, setPinned] = useState(student.pinned || false);
  const [important, setImportant] = useState(student.important || false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (isEditing && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    // Update editData if student prop changes (e.g., after save)
    setEditData({ ...student });
    setTags(student.tags || []);
    setPinned(student.pinned || false);
    setImportant(student.important || false);
  }, [student]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    const s1 = Number(editData.subject1);
    const s2 = Number(editData.subject2);
    const s3 = Number(editData.subject3);

    if ([s1, s2, s3].some(mark => mark < 0 || mark > 100 || isNaN(mark))) {
      alert("❌ Marks must be numbers between 0 and 100.");
      return;
    }

    const total = s1 + s2 + s3;
    const avg = total / 3;
    let grade = 'Fail';
    if (avg >= 75) grade = 'A';
    else if (avg >= 60) grade = 'B';
    else if (avg >= 35) grade = 'C';

    const updatedStudent = {
      ...editData,
      subject1: s1,
      subject2: s2,
      subject3: s3,
      total,
      avg,
      grade,
      id: student.id,
      tags,
      pinned,
      important
    };

    onEdit(student.id, updatedStudent);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditData({ ...student }); // Revert changes
    setTags(student.tags || []);
    setPinned(student.pinned || false);
    setImportant(student.important || false);
  };

  const handleAddTag = (tag) => {
    if (!tag) return;
    if (!tags.includes(tag)) {
      const newTags = [...tags, tag];
      setTags(newTags);
      onEdit(student.id, { ...student, tags: newTags });
    } else {
      alert("Tag already exists!");
    }
  };

  const handlePin = () => {
    const newPinned = !pinned;
    setPinned(newPinned);
    onEdit(student.id, { ...student, pinned: newPinned });
  };

  const handleMarkImportant = () => {
    const newImportant = !important;
    setImportant(newImportant);
    onEdit(student.id, { ...student, important: newImportant });
  };

  return (
    <tr className={`${isEditing ? 'editing-row' : ''} ${pinned ? 'pinned' : ''} ${important ? 'important' : ''}`}>
      <td>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onCheck(student.id)}
        />
      </td>

      <td>
        {isEditing ? (
          <input
            name="name"
            value={editData.name}
            onChange={handleEditChange}
            ref={nameInputRef}
          />
        ) : (
          student.name
        )}
      </td>

      <td>
        {isEditing ? (
          <input
            name="roll"
            value={editData.roll}
            onChange={handleEditChange}
          />
        ) : (
          student.roll
        )}
      </td>

      <td>
        {isEditing ? (
          <>
            <input
              name="subject1"
              type="number"
              value={editData.subject1}
              onChange={handleEditChange}
              min="0"
              max="100"
            />
            <input
              name="subject2"
              type="number"
              value={editData.subject2}
              onChange={handleEditChange}
              min="0"
              max="100"
            />
            <input
              name="subject3"
              type="number"
              value={editData.subject3}
              onChange={handleEditChange}
              min="0"
              max="100"
            />
          </>
        ) : (
          `${student.subject1}, ${student.subject2}, ${student.subject3}`
        )}
      </td>

      <td>{student.total}</td>
      <td>{student.avg.toFixed(2)}</td>
      <td>{student.grade}</td>

      <td>
        <ThreeDotsMenu
          onEdit={() => setIsEditing(true)}
          onDelete={() => onDelete(student.id)}
          onSave={saveEdit}
          onCancel={cancelEdit}
          isEditing={isEditing}
          onAddTag={handleAddTag}
          onPin={handlePin}
          onMarkImportant={handleMarkImportant}
          tags={tags}
          pinned={pinned}
          important={important}
        />
      </td>
    </tr>
  );
};

export default StudentRow;
