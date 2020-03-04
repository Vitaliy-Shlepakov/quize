import {
  CREATE_QUIZ_QUESTION,
  FINISH_CREATE_QUIZ,
  RESET_QUIZ_CREATION
} from "./actionsType";
import axios from "../../axiosInstance/axiosInstance";


export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    payload: {
      item
    }
  }
};

export function finishCreateQuiz() {
  console.log('here');
  return async (dispatch, getState) => {
    const state = getState().create;
    console.log(state, 'state+++++++++++++');
    await axios({
      method: 'POST',
      url: 'guizes.json',
      data: {
        ...state.quiz,
        ...state.rightAnswerId
      }
    });
    resetQuizCreation()
  }
};


export function resetQuizCreation(){
  return {
    type: RESET_QUIZ_CREATION
  }
}
