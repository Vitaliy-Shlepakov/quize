import React, {Component} from 'react';
import './QuizList.sass';
import {NavLink} from "react-router-dom";
import axios from "../../axiosInstance/axiosInstance";
import Loader from "../../components/UI/Loader/Loader";

class QuizList extends Component {

  state = {
    quizes: [],
    loading: true
  }

  async componentDidMount() {
    try{
      const response = await axios({
        method: 'GET',
        url: '/guizes.json'
      });
      const quizes = [];

      Object.keys(response.data).map((item, index) => {
        quizes.push( {
          id: item,
          name: `Тест №${index + 1}`
        })
      });

      this.setState({
        quizes,
        loading: false
      })

    }catch(e){
      console.log(e);
    }
  };

  render() {
    const { quizes,loading } = this.state;

    return (
      <div className="QuizList">
        <h1 className="QuizList__Title">Список тестов</h1>
        {
          loading
            ? <Loader/>
            : (
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
            )
        }
      </div>
    );
  }
}

export default QuizList;
