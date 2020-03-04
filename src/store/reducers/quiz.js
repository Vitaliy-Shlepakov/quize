import {
  FETCH_QUIZ_ERROR,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS
} from "../actions/actionsType";

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  activeQuestion: 0,
  answerState: {},
  isFinished: false,
  results: {},   //{[id]: success or error}
  quiz: null,
};

export default function quizReducer(state=initialState, action){
  console.log(action, 'ACTION INTO REDUCER')
  switch (action.type) {

    case FETCH_QUIZES_START: {
      return {
        ...state,
        loading: true
      }
    };

    case FETCH_QUIZES_SUCCESS: {
      return {
        ...state,
        loading: false,
        quizes: action.payload.quizes
      }
    };

    case FETCH_QUIZES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload.err
      }
    };

    case FETCH_QUIZ_SUCCESS: {
      return {
        ...state,
        loading: false,
        quiz: action.payload.quiz
      }
    };

    case FETCH_QUIZ_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    };

    default: {
      return {...state}
    }
  }
}
