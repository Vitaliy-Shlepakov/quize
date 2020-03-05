import {
  CREATE_QUIZ_QUESTION,
  RESET_QUIZ_CREATION
} from "./actionsType";
import axios from "../../axiosInstance/axiosInstance";


export function createQuizQuestion(item) {
  console.log(item, 'CREATE ITEM');
  return {
    type: CREATE_QUIZ_QUESTION,
    payload: {
      item
    }
  }
};

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    const state = getState().create;
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
