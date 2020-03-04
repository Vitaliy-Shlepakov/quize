import React, {Component} from 'react';
import './QuizList.sass';
import {NavLink} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from 'react-redux';
import {fetchQuizes} from "../../store/actions/quize";

class QuizList extends Component {

  componentDidMount() {
    const { fetchQuizes } = this.props;
    fetchQuizes();
  };

  render() {
    const { quizes,loading } = this.props;

    return (
      <div className="QuizList">
        <h1 className="QuizList__Title">Список тестов</h1>
        {
          loading && quizes.length
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
};

const mapStateToProps = state => {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchQuizes: () => {dispatch(fetchQuizes())}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
(QuizList)
