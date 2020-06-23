import axios from 'axios';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const REGISTER_RESET = "REGISTER_RESET";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const CLEAR_REGISTERERROR = "CLEAR_REGISTERERROR";
export const CLEAR_LOGINERROR = "CLEAR_LOGINERROR";


export const login = (email, password, history) => {    
    return dispatch => {
        dispatch(loginBegin());
        let loginRequest = {
            "email": email,
            "password": password
        }
        axios.post(endpoint+'/api/users/authenticate/',loginRequest)
        .then(res => {
            localStorage.setItem('user', JSON.stringify(res));
            dispatch(loginSuccess(res.data.user));
            history.push('/Dashboard');
            return res.data.user;
        })
        .catch(error => dispatch(loginFailure(error)));
    }
};

export const register = (name, username, email, password, history) => {    
    return dispatch => {
        let registerRequest = {
            "name": name,
            "username": username,
            "email": email,
            "password": password
        }
        axios.post(endpoint+'/api/users/',registerRequest)
        .then(res => {
            dispatch(registerSuccess());
            history.push('/');
        })
        .catch(error => dispatch(registerFailure(error)));
    }
};

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('user');
        dispatch(logoutSuccess());
    }
};

export const loginSuccess = user => ({
    type: LOGIN_SUCCESS,
    payload: { user }
});

export const loginFailure = error => ({
    type: LOGIN_FAILURE,
    payload: { error }
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
});

export const registerReset = () => ({
    type: REGISTER_RESET
});

export const registerSuccess = () => ({
    type: REGISTER_SUCCESS
});

export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: { error }
});

export const clearRegisterErrorMsg = () => ({
    type: CLEAR_REGISTERERROR
});

export const clearLoginErrorMsg = () => ({
    type: CLEAR_LOGINERROR
});