import React from 'react';
import './ActiveQuiz.sass';
import AnswersList from "../AnswersList/AnswersList";

const ActiveQuiz = ({answers, question, onAnswerClickHandle, answerNumber, quizLength, state}) => {

  return (
    <div className="ActiveQuiz">
      <p className="ActiveQuiz__Question">
        <span>
          <strong>1.</strong>
          &nbsp;
          {question}
        </span>

        <small>{answerNumber} из {quizLength}</small>
      </p>

      <AnswersList
        answers={answers}
        onAnswerClickHandle={onAnswerClickHandle}
        state={state}
      />
    </div>
  );
};

export default ActiveQuiz;
