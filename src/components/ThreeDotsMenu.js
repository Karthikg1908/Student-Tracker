import React, { useState, useRef, useEffect } from 'react';

const ThreeDotsMenu = ({ onEdit, onDelete, onSave, isEditing }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to handle delete confirmation
  const handleDelete = () => {
    const confirmation = window.confirm('Are you sure you want to delete this item?');
    if (confirmation) {
      onDelete();
      setOpen(false);
    }
  };

  return (
    <div className="dots-menu-wrapper" ref={menuRef}>
      <div className="dots-menu" onClick={() => setOpen(prev => !prev)}>
        ⋮
      </div>
      {open && (
        <div className="menu">
          {isEditing ? (
            <button onClick={() => { onSave(); setOpen(false); }}>Save</button>
          ) : (
            <button onClick={() => { onEdit(); setOpen(false); }}>Edit</button>
          )}
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ThreeDotsMenu;
