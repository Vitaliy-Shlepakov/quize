import React from 'react';
import './Input.sass';
import classNames from 'classnames';



const Input = ({
                 type = 'text',
                 customClass,
                 label,
                 value,
                 onChange,
                 errorMessage,
                 touched,
                 shouldValidate,
                 valid
              }) => {

  const isInvalid = (valid, touched, shouldValidate) => {
    return !valid && shouldValidate && touched;
  };

  const htmlFor = `${type}--${Math.random()}`;

  return (
    <div className={classNames({
      'Input': true,
      [`Input--${customClass}`]: !!customClass,
      'Input--Error': isInvalid()
    })}>
      <label
        htmlFor={htmlFor}
        className="Input__Label"
      >
        { label }
      </label>
      <input
        type={type}
        id={htmlFor}
        value={value}
        onChange={onChange}
        className="Input__Field"
      />
      {
        touched && !valid && <span className="Input__Error">{errorMessage}</span>
      }
    </div>
  );
};

export default Input;
