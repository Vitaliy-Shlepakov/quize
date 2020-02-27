import React, {Component} from 'react';
import './QuizList.sass';
import {NavLink} from "react-router-dom";

class QuizList extends Component {

  render() {
    return (
      <div className="QuizList">
        <h1 className="QuizList__Title">Список тестов</h1>
        <ul className="QuizList__List">
          {
            [1,2,3].map((quiz, index) => {
              return (
                <li key={index} className="QuizList__Item">
                  <NavLink to={`/quiz/${quiz}`} className="QuizList__Link">
                    Тест {quiz}
                  </NavLink>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default QuizList;
