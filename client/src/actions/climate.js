import axios from 'axios';

import {
  GET_INDICATOR_LIST,
  INDICATOR_LIST_ERROR,
  GET_INDICATOR_BY_CITY,
  INDICATOR_BY_CITY_ERROR,
  CLEAR_INDICATOR_BY_CITY,
  GET_CLIMATE_SOURCES,
  CLIMATE_SOURCES_ERROR,
  CLEAR_CLIMATE_SOURCES,
} from './types';

// Get climate indicator list
export const getIndicatorList = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/climate/indicator`);

    dispatch({
      type: GET_INDICATOR_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: INDICATOR_LIST_ERROR,
      payload: { msg: err.response, status: err.response.status },
    });
  }
};

// Get climate indicator by city
export const getIndicatorByCity = (
  city,
  scenario = 'RCP85',
  indicator_name = 'accumulated_freezing_degree_days',
  startYear = 1950,
  endYear = 2100
) => async (dispatch) => {
  dispatch({ type: CLEAR_INDICATOR_BY_CITY });
  try {
    const res = await axios.get(
      `/api/climate/climate-data/${city}/${scenario}/indicator/${indicator_name}/?years=${startYear}:${endYear}`
    );

    dispatch({
      type: GET_INDICATOR_BY_CITY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: INDICATOR_BY_CITY_ERROR,
      payload: { msg: err.response, status: err.response.status },
    });
  }
};

// Get climate sources
export const getClimateSources = () => async (dispatch) => {
  dispatch({ type: CLEAR_CLIMATE_SOURCES });
  try {
    const res = await axios.get(`/api/climate/sources`);

    dispatch({
      type: GET_CLIMATE_SOURCES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CLIMATE_SOURCES_ERROR,
      payload: { msg: err.response, status: err.response.status },
    });
  }
};
