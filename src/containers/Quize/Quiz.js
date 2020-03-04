import React, {Component} from 'react';
import './Quize.sass';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from 'react-redux';
import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../store/actions/quize";

class Quiz extends Component {

  componentDidMount() {
    const { fetchQuizById } = this.props;
    const id = this.props.match.params.id;
    fetchQuizById(id);
  };

  componentWillUnmount() {
    const { retryQuiz } = this.props;
    retryQuiz();
  }

  render() {
    const {
      quiz,
      isFinished,
      activeQuestion,
      answerState,
      results,
      isLoading,
      quizAnswerClick,
      retryQuiz
    } = this.props;

    if(isLoading || !quiz){
      return <Loader/>
    }
    console.log(results, 'results');
    return (
      <div className="Quiz">
        <div className="Quiz__Wrapper">
          {
            isFinished
              ? <FinishedQuiz
                  results={results}
                  quiz={quiz}
                  onRetry={retryQuiz}
                />
              : <>
                <h1 className="Quiz__Title">Ответьте на все вопросы</h1>
                <ActiveQuiz
                  answers={quiz[activeQuestion].answers}
                  question={quiz[activeQuestion].question}
                  onAnswerClickHandle={quizAnswerClick}
                  quizLength={quiz.length}
                  answerNumber={activeQuestion + 1}
                  state={answerState}
                />
                </>
          }
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  const { quiz } = state;
  return {
    activeQuestion: quiz.activeQuestion,
    answerState: quiz.answerState,
    isFinished: quiz.isFinished,
    results: quiz.results,
    quiz: quiz.quiz,
    loading: quiz.loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
