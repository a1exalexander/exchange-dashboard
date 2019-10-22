import React from 'react';

const Checkbox = ({ className, checked, onChange }) => {

  return (
    <label className='checkbox'><input  type='checkbox' className={`checkbox__input ${className}`} checked={checked} onChange={onChange}/></label>
  )
}

export default Checkbox;
