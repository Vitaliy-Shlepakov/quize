import React from 'react';
import './Select.sass';

const Select = ({label, value, onChange, options}) => {
  const htmlFor = `${label}--${Math.random()}`;

  return (
    <div className="Select">
      <label htmlFor={htmlFor} className="Select__Label">{ label }</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        id={htmlFor}
        accessKey={'t'}
        className="Select__Select"
      >
        {
          options.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                { option.text }
              </option>
            )
          })
        }
      </select>
    </div>
  );
};

export default Select;
