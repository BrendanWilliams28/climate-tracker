import axios from 'axios';

import {
  GET_INDICATOR_LIST,
  INDICATOR_LIST_ERROR,
  GET_INDICATOR_BY_CITY,
  INDICATOR_BY_CITY_ERROR,
  CLEAR_INDICATOR_BY_CITY
} from './types';

// Get climate indicator list
export const getIndicatorList = () => async dispatch => {
  try {
    const res = await axios.get(`/api/climate/indicator`);

    dispatch({
      type: GET_INDICATOR_LIST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: INDICATOR_LIST_ERROR,
      payload: { msg: err.response, status: err.response.status }
    });
  }
};

// Get climate indicator by city
export const getIndicatorByCity = (
  city,
  scenario = 'RCP85',
  indicator_name = 'accumulated_freezing_degree_days'
) => async dispatch => {
  dispatch({ type: CLEAR_INDICATOR_BY_CITY });
  try {
    const res = await axios.get(
      `/api/climate/climate-data/${city}/${scenario}/indicator/${indicator_name}`
    );

    dispatch({
      type: GET_INDICATOR_BY_CITY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: INDICATOR_BY_CITY_ERROR,
      payload: { msg: err.response, status: err.response.status }
    });
  }
};