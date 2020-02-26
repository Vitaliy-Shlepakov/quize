import React, {Component} from 'react';
import './Quize.sass';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends Component {

  state = {
    activeQuestion: 0,
    answerState: {},
    quiz: [
      {
        id: 1,
        question: 'Какого цвета небо',
        rightAnswerId: 4,
        answers: [
          {text: 'Черный', id: 1},
          {text: 'Красный', id: 2},
          {text: 'Зеленый', id: 3},
          {text: 'Синий', id: 4},
        ]
      },
      {
        id: 2,
        question: 'В каком году',
        rightAnswerId: 3,
        answers: [
          {text: '1700', id: 1},
          {text: '1702', id: 2},
          {text: '1703', id: 3},
          {text: '1802', id: 4},
        ]
      }
    ]
  };

  onAnswerClickHandle = (answerId) => {
    const { activeQuestion, quiz } = this.state;

    const currentQuiz = quiz[activeQuestion];

    if(currentQuiz.rightAnswerId === answerId){

      this.setState({
        answerState: {[answerId]: 'success'}
      });

      if(this.isQuizFinished()){
        console.log('finish');
      }else {
        setTimeout(() => {
          this.setState((state) => {
            return {
              activeQuestion: state.activeQuestion + 1
            }
          })
        }, 1000)
      }
    }else{

      this.setState({
        answerState: {[answerId]: 'error'}
      });
    }

  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  render() {
    return (
      <div className="Quiz">
        <div className="Quiz__Wrapper">
          <h1 className="Quiz__Title">Ответьте на все вопросы</h1>
          <ActiveQuiz
            answers={this.state.quiz[this.state.activeQuestion].answers}
            question={this.state.quiz[this.state.activeQuestion].question}
            onAnswerClickHandle={this.onAnswerClickHandle}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
            state={this.state.answerState}
          />
        </div>
      </div>
    );
  }
}

export default Quiz;
