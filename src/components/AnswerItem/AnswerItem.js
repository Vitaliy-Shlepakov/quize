import React from 'react';
import './AnswerItem.sass';

const AnswerItem = ({answer, onAnswerClickHandle}) => {
  return (
    <li
      className="AnswerItem"
      onClick={() => onAnswerClickHandle(answer.id)}
    >
      {answer.text}
    </li>
  );
};

export default AnswerItem;
