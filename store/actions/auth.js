import axios from 'axios';
import { endpoint } from '../../config';
import { AsyncStorage } from 'react-native';
import { setLogoutTimer } from '../actions/actions';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_RESET = 'REGISTER_RESET';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const CLEAR_REGISTERERROR = 'CLEAR_REGISTERERROR';
export const CLEAR_LOGINERROR = 'CLEAR_LOGINERROR';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    // eslint-disable-next-line no-undef
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

const saveDataToStorage = (userId, token) => {
  AsyncStorage.setItem(
    'user',
    JSON.stringify({
      userId: userId,
      token: token,
    })
  );
};

export const login = (email, password) => {
  return dispatch => {
    let loginRequest = {
      email: email,
      password: password,
    };
    axios
      .post('http://localhost:8080/api/users/authenticate/', loginRequest)
      .then(res => {
        let userData = res.data.user;
        console.log(userData);
        dispatch(loginSuccess(res.data.user));
        // dispatch(authenticate(userData.id, userData.token));
        // const expirationDate = new Date(
        //     new Date().getTime() + parseInt(resData.expiresIn) * 1000
        // );
        saveDataToStorage(userData.id, userData.token);
        return res.data.user;
      })
      .catch(error => {
        console.log(error);
        dispatch(loginFailure(error));
      });
  };
};

export const register = (name, username, email, password, history) => {
  return dispatch => {
    let registerRequest = {
      name: name,
      username: username,
      email: email,
      password: password,
    };
    axios
      .post(endpoint + '/api/users/', registerRequest)
      .then(() => {
        dispatch(registerSuccess());
        history.push('/');
      })
      .catch(error => dispatch(registerFailure(error)));
  };
};

export const logout = () => {
  return dispatch => {
    AsyncStorage.removeItem('user');
    dispatch(logoutSuccess());
  };
};

export const setDidTryAL = () => ({ type: SET_DID_TRY_AL });
export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: { user },
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: { error },
});

export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });
export const registerReset = () => ({ type: REGISTER_RESET });
export const registerSuccess = () => ({ type: REGISTER_SUCCESS });
export const registerFailure = error => ({
  type: REGISTER_FAILURE,
  payload: { error },
});

export const clearRegisterErrorMsg = () => ({ type: CLEAR_REGISTERERROR });
export const clearLoginErrorMsg = () => ({ type: CLEAR_LOGINERROR });
