import React, {Component} from 'react';
import './Quize.sass';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {

  state = {
    activeQuestion: 0,
    answerState: {},
    isFinished: true,
    results: {},   //{[id]: success or error}
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
    const { activeQuestion, quiz, answerState } = this.state;

    if(answerState){
      const key = Object.keys(answerState)[0];
      if(answerState[key] === 'success') {
        return;
      }
    }

    const currentQuiz = quiz[activeQuestion];

    if(currentQuiz.rightAnswerId === answerId){

      this.setState({
        answerState: {[answerId]: 'success'}
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
        }, 1500)
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
    const { quiz, isFinished, activeQuestion, answerState } = this.state;

    return (
      <div className="Quiz">
        <div className="Quiz__Wrapper">
          {
            isFinished
              ? <FinishedQuiz/>
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
