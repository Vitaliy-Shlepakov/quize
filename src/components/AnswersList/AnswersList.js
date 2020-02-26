import React from 'react';
import './AnswersList.sass';
import AnswerItem from "../AnswerItem/AnswerItem";

const AnswersList = ({answers, onAnswerClickHandle, state}) => {
  return (
    <div>
      <ul className="AnswersList">
        {
          answers.map((answer, index) => {
            return <AnswerItem
              answer={answer}
              key={index}
              onAnswerClickHandle={onAnswerClickHandle}
              state={state ? state[answer.id] : null}
            />
          })
        }
      </ul>
    </div>
  );
};

export default AnswersList;
