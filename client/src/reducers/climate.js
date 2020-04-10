import {
  GET_INDICATOR_LIST,
  INDICATOR_LIST_ERROR,
  GET_INDICATOR_BY_CITY,
  INDICATOR_BY_CITY_ERROR,
  CLEAR_INDICATOR_BY_CITY
} from '../actions/types';

const initialState = {
  indicatorList: [],
  indicatorByCity: {},
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_INDICATOR_LIST:
      return {
        ...state,
        indicatorList: payload,
        loading: false
      };
    case INDICATOR_LIST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case GET_INDICATOR_BY_CITY:
      return {
        ...state,
        indicatorByCity: payload,
        loading: false
      };
    case INDICATOR_BY_CITY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_INDICATOR_BY_CITY:
      return {
        ...state,
        indicatorByCity: {},
        loading: false
      };
    default:
      return state;
  }
}
