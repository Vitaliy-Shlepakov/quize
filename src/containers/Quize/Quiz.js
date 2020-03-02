import React, {Component} from 'react';
import './Quize.sass';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from '../../axiosInstance/axiosInstance';
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {

  state = {
    activeQuestion: 0,
    answerState: {},
    isFinished: false,
    results: {},   //{[id]: success or error}
    quiz: [],
    isLoading: true
  };

  async componentDidMount() {
    try{
      const id = this.props.match.params.id;
      console.log(id, 'id');
      const response = await axios({
        method: 'GET',
        url: `/guizes/${id}.json`
      });
      const quiz = response.data;

      this.setState({
        quiz,
        isLoading: false
      })
    } catch(e){
      console.log(e);
    }

  }

  onAnswerClickHandle = (answerId) => {
    const { activeQuestion, quiz, answerState } = this.state;
    console.log(answerId, 'guizes');

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
    const { quiz, isFinished, activeQuestion, answerState, results, isLoading } = this.state;

    if(isLoading){
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
}

export default Quiz;
