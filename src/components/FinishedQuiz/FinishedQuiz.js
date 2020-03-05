import React from 'react';
import './FinishedQuiz.sass';
import classNames from 'classnames';
import Button from "../UI/Button/Button";
import {Link} from "react-router-dom";

const FinishedQuiz = ({results, quiz, onRetry}) => {

  const counterOfSuccess = () => {
    let counter = 0;
    for(let key in results){
      if(results[key] === 'success'){
        counter ++
      }
    }
    return counter
  }

  return (
    <div className="FinishedQuiz">
      <h1>Результат:</h1>
       <ul>
         {
           quiz.map((quizItem, index) => {
             return(
               <li className="FinishedQuiz__Item" key={index}>
                 <strong>{index + 1}.&nbsp;</strong>
                 {quizItem.question}
                 <i className={classNames({
                   'fa': true,
                   'fa-times error': results[quizItem.id] === 'error',
                   'fa-check success': results[quizItem.id] === 'success'
                 })}></i>
               </li>
             )
           })
         }

       </ul>
      <p>
        правильно&nbsp;
        { counterOfSuccess() }
        &nbsp;из&nbsp;
        { quiz.length }
      </p>
      <div className="FinishedQuiz__Action">
       <Button
        onClick={onRetry}
        customClass="Primary"
       >
        Повторить
       </Button>
       <Link to='/'>
         <Button customClass="Success">Перейти к списку тестов</Button>
       </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
