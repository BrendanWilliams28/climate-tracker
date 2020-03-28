import axios from 'axios';

import { GET_USER, USER_ERROR } from './types';

export const getCurrentUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
