import axios from 'axios';
import {AUTH_SUCCESS, AUTO_LOGIN, LOG_OUT} from "./actionsType";

export function auth(email, password, isLogin) {
  return async dispatch => {

    const data = {
      email: email.value,
      password: password.value,
      returnSecureToken: true
    };

    let url;
    url = isLogin
      ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC4MBxNODL4UYY1cjbnUQIDZPNnBv6F0xY'
      : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC4MBxNODL4UYY1cjbnUQIDZPNnBv6F0xY';

    const response = await axios({
      method: 'POST',
      url,
      data
    });

    //время до которого токун актуален
    const expirationDate = response.data.expiresIn * 1000

    localStorage.setItem('token', 'response.data.idToken');
    localStorage.setItem('userId', 'response.data.idToken');
    localStorage.setItem('expirationDate', `${expirationDate}`);

    dispatch(authSuccess(response.data.idToken));
    dispatch(autoLogOut(expirationDate));
  }
}

export function authSuccess(token){
  return {
    type: AUTH_SUCCESS,
    payload: {
      token
    }
  }
};

export function autoLogOut(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logOut())
    }, time )
  }
};

export function logOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: LOG_OUT
  }
}

export function autoLogin() {
  return {
    type: AUTO_LOGIN
  }
}
