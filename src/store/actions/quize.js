import axios from "../../axiosInstance/axiosInstance";
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZ_ERROR
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

}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    payload: {
      quiz
    }
  }
};

export function fetchQuizError(error) {
  return {
    type: FETCH_QUIZ_ERROR,
    payload: {
      error
    }
  }
}
