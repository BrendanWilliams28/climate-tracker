import axios from 'axios';

import { GET_PROJECTS, PROJECTS_ERROR } from './types';

// Get current user's projects
export const getUserProjects = () => async dispatch => {
  try {
    const res = await axios.get('/api/projects/user');

    dispatch({
      type: GET_PROJECTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROJECTS_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
