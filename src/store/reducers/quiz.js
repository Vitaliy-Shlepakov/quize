import {
  FETCH_QUIZ_ERROR,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUIZ, QUIZ_SET_STATE, RETRY_QUIZ
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

    case QUIZ_SET_STATE: {
      return {
        ...state,
        answerState: action.payload.answerState,
        results: action.payload.results
      }
    };

    case FINISH_QUIZ: {
      return {
        ...state,
        isFinished: true
      }
    };

    case QUIZ_NEXT_QUIZ: {
      return {
        ...state,
        answerState: null,
        activeQuestion: action.payload.activeNumber
      }
    };

    case RETRY_QUIZ: {
      return {
        ...state,
        activeQuestion: 0,
        answerState: {},
        isFinished: false,
        results: {}
      }
    };

    default: {
      return {...state}
    }
  }
}
