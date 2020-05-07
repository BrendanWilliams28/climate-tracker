import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_USER,
  CLEAR_USERS,
  CLEAR_PROJECT,
  CLEAR_INDICATOR_BY_CITY,
  CLEAR_CLIMATE_SOURCES,
  CLEAR_INDICATOR_LIST,
} from './types';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Login User for Reset Password
export const loginReset = (resetPassword, history) => async (dispatch) => {
  dispatch({ type: CLEAR_USER });
  dispatch({ type: CLEAR_USERS });
  dispatch({ type: CLEAR_PROJECT });
  dispatch({ type: CLEAR_INDICATOR_BY_CITY });
  dispatch({ type: CLEAR_INDICATOR_LIST });
  dispatch({ type: CLEAR_CLIMATE_SOURCES });
  dispatch({ type: LOGOUT });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ resetPassword });

  try {
    const res = await axios.post('/api/auth/reset-password', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());

    history.push('/change-password');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });

    dispatch({ type: CLEAR_USER });
    dispatch({ type: CLEAR_USERS });
    dispatch({ type: CLEAR_PROJECT });
    dispatch({ type: CLEAR_INDICATOR_BY_CITY });
    dispatch({ type: CLEAR_INDICATOR_LIST });
    dispatch({ type: CLEAR_CLIMATE_SOURCES });
    dispatch({ type: LOGOUT });

    history.push('/');
  }
};

// Logout / Clear Profile
export const logout = (history) => (dispatch) => {
  dispatch({ type: CLEAR_USER });
  dispatch({ type: CLEAR_USERS });
  dispatch({ type: CLEAR_PROJECT });
  dispatch({ type: CLEAR_INDICATOR_BY_CITY });
  dispatch({ type: CLEAR_INDICATOR_LIST });
  dispatch({ type: CLEAR_CLIMATE_SOURCES });
  dispatch({ type: LOGOUT });

  history.push('/');
};
