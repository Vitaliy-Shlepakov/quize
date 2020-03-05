import axios from "../../axiosInstance/axiosInstance";
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZ_ERROR,
  QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QUIZ, RETRY_QUIZ
} from "./actionsType";


//quizes-list
export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart)
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

      dispatch(fetchQuizesSuccess(quizes))

    }catch(e){
      fetchQuizesError(e)
    }
  }
};

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
};

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    payload: {
      quizes
    }
  }
};

export function fetchQuizesError(err) {
  return {
    type: FETCH_QUIZES_ERROR,
    payload: {
      error: err
    }
  }
};



//quiz-page
export function fetchQuizById(quizId) {

  return async dispatch => {
    dispatch(fetchQuizesStart());
    try{
      const response = await axios({
        method: 'GET',
        url: `/guizes/${quizId}.json`
      });
      const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz))
    } catch(e){
      dispatch(fetchQuizError(e))
    }
  }
};

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    payload: {
      quiz
    }
  }
};

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {

    const state = getState().quiz;

    const { activeQuestion, quiz, answerState } = state;

    if(answerState){
      const key = Object.keys(answerState)[0];
      if(answerState[key] === 'success') {
        return;
      }
    };


    let results = state.results;
    const question = quiz[activeQuestion];

    if(question.rightAnswerId == answerId){
      if(!results[question.id]){
        //запись результата
        results[question.id] = 'success';
      };

      dispatch(quizSetState({[answerId]: 'success'}, results));

      if(state.activeQuestion + 1 === state.quiz.length){
        dispatch(finishQuiz());
      }else {
        dispatch(quizNextQuestion(state.activeQuestion + 1))
      }
    }else{
      //запись результата
      results[question.id] = 'error';
      dispatch(quizSetState({[answerId]: 'error'}, results))
    }
  }
};

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    payload: {
      answerState,
      results
    }
  }
};

export function finishQuiz() {
  return{
    type: FINISH_QUIZ
  }
};

export function quizNextQuestion(activeNumber) {
  return {
    type: QUIZ_NEXT_QUIZ,
    payload: {
      activeNumber
    }
  }
};

export function retryQuiz(){
  return {
    type: RETRY_QUIZ
  }
}




export function fetchQuizError(error) {
  return {
    type: FETCH_QUIZ_ERROR,
    payload: {
      error
    }
  }
}
