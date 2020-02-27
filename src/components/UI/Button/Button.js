import React from 'react';
import './Button.sass';
import classNames from 'classnames';

const Button = (props) => {
  const {customClass, onClick, disabled} = props;

  return (
    <button
      onClick={onClick}
      className={classNames({
        'Button': true,
        [`Button--${customClass}`]: !!customClass
      })}
      disabled={disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
