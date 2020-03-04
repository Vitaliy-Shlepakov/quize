import { combineReducers } from 'redux';
import quizReducer from './quiz';
import createQuizReducer from './create';

export default combineReducers({
  quiz: quizReducer,
  create: createQuizReducer
});
