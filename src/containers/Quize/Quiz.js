import React, {Component} from 'react';
import './Quize.sass';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from '../../axiosInstance/axiosInstance';
import Loader from "../../components/UI/Loader/Loader";
import { connect } from 'react-redux';
import { fetchQuizById } from "../../store/actions/quize";

class Quiz extends Component {

  componentDidMount() {
    const { fetchQuizById } = this.props;
    const id = this.props.match.params.id;
    fetchQuizById(id);
  }

  onAnswerClickHandle = (answerId) => {
    const { activeQuestion, quiz, answerState } = this.props;

    const currentQuiz = quiz[activeQuestion];

    let results = this.state.results;
    if(answerState){
      const key = Object.keys(answerState)[0];
      if(answerState[key] === 'success') {
        return;
      }

    };

    if(currentQuiz.rightAnswerId === answerId){

      if(!results[currentQuiz.quizId]){
        //запись результата
        results[currentQuiz.quizId] = 'success'
      };

      this.setState({
        answerState: {[answerId]: 'success'},
        results
      });

      if(this.isQuizFinished()){
        this.setState({isFinished: true})
      }else {
        setTimeout(() => {
          this.setState((state) => {
            return {
              activeQuestion: state.activeQuestion + 1,
              answerState: {}
            }
          })
        }, 500)
      }
    }else{
      //запись результата
      results[currentQuiz.quizId] = 'error';

      this.setState({
        answerState: {[answerId]: 'error'},
        results: results
      });
    }

  };

  handlerOnRetry = () => {
    this.setState({
      activeQuestion: 0,
      answerState: {},
      isFinished: false,
      results: {}
    })
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  render() {
    const { quiz, isFinished, activeQuestion, answerState, results, isLoading } = this.props;

    if(isLoading || !quiz){
      return <Loader/>
    }

    return (
      <div className="Quiz">
        <div className="Quiz__Wrapper">
          {
            isFinished
              ? <FinishedQuiz
                  results={results}
                  quiz={quiz}
                  onRetry={this.handlerOnRetry}
                />
              : <>
                <h1 className="Quiz__Title">Ответьте на все вопросы</h1>
                <ActiveQuiz
                  answers={quiz[activeQuestion].answers}
                  question={quiz[activeQuestion].question}
                  onAnswerClickHandle={this.onAnswerClickHandle}
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
    fetchQuizById: id => dispatch(fetchQuizById(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
