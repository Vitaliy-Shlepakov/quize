import {AUTH_SUCCESS, LOG_OUT} from "../actions/actionsType";

const initialState = {
  email: '',
  password: '',
  isLogin: false
};

export default function authReducer(state = initialState, action) {

  switch(action.type){

    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token
      }

    case LOG_OUT:
      return {
        ...state,
        token: ''
      }

    default:
      return {
        ...state
      }
  }
}
