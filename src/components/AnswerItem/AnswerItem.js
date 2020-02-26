import React from 'react';
import './AnswerItem.sass';
import className from 'classnames';

const AnswerItem = ({answer, onAnswerClickHandle, state}) => {

  return (
    <li
      className={
        className({
          'AnswerItem': true,
          'AnswerItem--Success': state === 'success',
          'AnswerItem--Error': state === 'error',
        })
      }
      onClick={() => onAnswerClickHandle(answer.id)}
    >
      {answer.text}
    </li>
  );
};

export default AnswerItem;
