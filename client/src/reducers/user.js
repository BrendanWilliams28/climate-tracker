import { GET_USER, USER_ERROR, CLEAR_USER } from '../actions/types';

const initialState = {
  users: [],
  user: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false
      };
    case USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
        loading: false
      };
    default:
      return state;
  }
}
