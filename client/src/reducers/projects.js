import {
  GET_PROJECT,
  PROJECT_ERROR,
  GET_PROJECTS,
  PROJECTS_ERROR,
  DELETE_PROJECT
} from '../actions/types';

const initialState = {
  projects: [],
  project: {},
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECT:
      return {
        ...state,
        project: payload,
        loading: false
      };
    case PROJECT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case GET_PROJECTS:
      return {
        ...state,
        projects: payload,
        loading: false
      };
    case PROJECTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(project => project._id !== payload),
        loading: false
      };
    default:
      return state;
  }
}
