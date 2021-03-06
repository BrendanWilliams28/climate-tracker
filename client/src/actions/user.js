import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_USER,
  USER_ERROR,
  GET_USERS,
  USERS_ERROR,
  CLEAR_USER,
  CLEAR_USERS,
  DELETE_USER,
  LOGOUT,
} from './types';

// Get current User
export const getCurrentUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Update profile
export const updateProfile = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.put('/api/users', formData, config);

    /*
    dispatch({
      type: GET_USER,
      payload: res.data
    });
    */
    dispatch(getCurrentUser());

    dispatch(setAlert('Profile Updated', 'success'));

    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: USER_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Update selected theme
export const updateTheme = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.put('/api/users/theme', formData, config);

    dispatch(getCurrentUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: USER_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Update password
export const updatePassword = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.put('/api/users/password', formData, config);

    dispatch(setAlert('Password Updated', 'success'));

    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: USER_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Reset password
export const resetPassword = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.post('/api/mail/reset', formData, config);

    dispatch(
      setAlert('Your password has been reset and emailed to you', 'success')
    );

    history.push('/login');
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
};

// Delete user & projects
export const deleteUser = (userId) => async (dispatch) => {
  try {
    await axios.delete('/api/users');

    dispatch({ type: CLEAR_USER });

    dispatch({
      type: DELETE_USER,
      payload: userId,
    });

    dispatch({ type: LOGOUT });

    dispatch(setAlert('User Deleted', 'success'));
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Get all users
export const getUsers = () => async (dispatch) => {
  dispatch({
    type: CLEAR_USERS,
  });
  try {
    const res = await axios.get('/api/users/list');

    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
