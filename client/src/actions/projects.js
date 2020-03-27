import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROJECT,
  DELETE_PROJECT,
  PROJECT_ERROR,
  GET_PROJECTS,
  PROJECTS_ERROR
} from './types';

// Create or update project
export const createProject = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/projects', formData, config);

    dispatch({
      type: GET_PROJECT,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Project Updated' : 'Project Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get current project
export const getCurrentProject = projectId => async dispatch => {
  try {
    const res = await axios.get(`/api/projects/${projectId}`);

    dispatch({
      type: GET_PROJECT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get project by ID
export const getProjectById = projectId => async dispatch => {
  try {
    const res = await axios.get(`/api/projects/${projectId}`);

    dispatch({
      type: GET_PROJECT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get user's project list
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

// Delete project
export const deleteProject = projectId => async dispatch => {
  try {
    await axios.delete(`/api/projects/${projectId}`);

    dispatch({
      type: DELETE_PROJECT,
      payload: projectId
    });

    dispatch(setAlert('Project Deleted', 'success'));
  } catch (error) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
