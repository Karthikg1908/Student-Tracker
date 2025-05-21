import React, { useState, useRef, useEffect } from 'react';

const ThreeDotsMenu = ({
  onEdit,
  onDelete,
  onSave,
  onCancel,
  isEditing,
  onMarkImportant,
  important
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dots-menu-wrapper" ref={menuRef}>
      <button className="dots-menu" onClick={() => setMenuOpen(!menuOpen)} title="Options">
        ⋮
      </button>

      {menuOpen && (
        <div className="menu">
          {!isEditing ? (
            <>
              <button onClick={() => { onEdit(); setMenuOpen(false); }}>Edit</button>
              <button onClick={() => { onDelete(); setMenuOpen(false); }}>Delete</button>
              <button onClick={() => { onMarkImportant(); setMenuOpen(false); }}>
                {important ? 'Clear' : 'Highlight'}
              </button>
            </>
          ) : (
            <>
              <button onClick={() => { onSave(); setMenuOpen(false); }}>Save</button>
              <button onClick={() => { onCancel(); setMenuOpen(false); }}>Cancel</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ThreeDotsMenu;
