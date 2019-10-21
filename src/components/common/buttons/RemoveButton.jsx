import React from 'react';
import IconPlus from '../../icons/IconPlus';

const RemoveButton = ({ className, onClick }) => {
  
  return (
    <button onClick={onClick} className={`remove-btn ${className}`}>
      <IconPlus className="remove-btn__icon" />
    </button>
  )
};

export default RemoveButton;
