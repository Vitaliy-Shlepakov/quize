import React, {Component} from 'react';
import './QuizList.sass';
import {NavLink} from "react-router-dom";
import axios from "axios";

class QuizList extends Component {

  state = {
    quizes: []
  }

  async componentDidMount() {
    try{
      const response = await axios.get('https://guiz-eaa7e.firebaseio.com/guizes.json');
      const quizes = [];

      Object.keys(response.data).map((item, index) => {
        quizes.push( {
          id: item,
          name: `Тест №${index + 1}`
        })
      });

      this.setState({
        quizes
      })

    }catch(e){
      console.log(e);
    }
  };

  render() {
    const { quizes } = this.state;
    console.log(quizes, 'quizes LISt');

    return (
      <div className="QuizList">
        <h1 className="QuizList__Title">Список тестов</h1>
        <ul className="QuizList__List">
          {
            quizes.map(quiz => {
              return (
                <li key={quiz.id} className="QuizList__Item">
                  <NavLink to={`/quiz/${quiz.id}`} className="QuizList__Link">
                    { quiz.name }
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
