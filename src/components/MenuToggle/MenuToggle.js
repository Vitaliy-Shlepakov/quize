import React from 'react';
import './MenuToggle.sass';
import classNames from 'classnames';

const MenuToggle = ({onToggle, isOpen}) => {
  return (
    <i
      className={classNames({
        'MenuToggle fa': true,
        'fa-times MenuToggle--Open': isOpen,
        'fa-bars': !isOpen
      })}
      onClick={onToggle}
    >

    </i>
  );
};

export default MenuToggle;
