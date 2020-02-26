import React from 'react';
import './FinishedQuiz.sass';

const FinishedQuiz = () => {
  return (
    <div className="FinishedQuiz">
      <h1>Результат:</h1>
       <ul>
         <li className="FinishedQuiz__Item FinishedQuiz__Item--Success">
           <strong>1.&nbsp;</strong>
           How are you?
           <i className="fa fa-times"></i>
         </li>
         <li className="FinishedQuiz__Item FinishedQuiz__Item--Error">
           <strong>2.&nbsp;</strong>
           I am okey
           <i className="fa fa-check"></i>
         </li>
       </ul>
      <p>правильно 4 из 10</p>
      <div>
        <button>Повторить</button>
      </div>
    </div>
  );
};

export default FinishedQuiz;
