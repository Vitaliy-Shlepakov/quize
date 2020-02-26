import React from 'react';
import './AnswersList.sass';
import AnswerItem from "../AnswerItem/AnswerItem";

const AnswersList = ({answers, onAnswerClickHandle, answerState}) => {
  return (
    <div>
      <ul className="AnswersList">
        {
          answers.map((answer, index) => {
            return <AnswerItem
              answer={answer}
              key={index}
              onAnswerClickHandle={onAnswerClickHandle}
              answerState={answerState}
            />
          })
        }
      </ul>
    </div>
  );
};

export default AnswersList;
