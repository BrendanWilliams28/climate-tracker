import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getIndicatorList, getIndicatorByCity } from '../../actions/climate';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1, 'auto'),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const IndicatorList = ({
  getIndicatorList,
  auth: { user },
  climateList: { indicatorList, loading },
  getIndicatorByCity,
  cityId,
  defaultValue,
  startYear,
  endYear,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (indicatorList.length === 0) getIndicatorList();
  }, [getIndicatorList, indicatorList.length]);

  const setIndicator = (indicator) => {
    if (indicator)
      getIndicatorByCity(cityId, undefined, indicator, startYear, endYear);
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {indicatorList.length > 0 ? (
        <FormControl variant='outlined' className={classes.formControl}>
          <InputLabel id='demo-simple-select-outlined-label'>
            Climate Indicator
          </InputLabel>
          <Select
            labelId='demo-simple-select-outlined-label'
            id='demo-simple-select-outlined'
            defaultValue={defaultValue}
            onChange={(event) => setIndicator(event.target.value)}
            label='Climate Indicator'
          >
            {indicatorList
              .filter((indicator) => !indicator.name.includes('threshold'))
              .map((indicator) => (
                <MenuItem key={indicator.name} value={indicator.name}>
                  {indicator.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      ) : (
        <h4>No climate indicators loaded</h4>
      )}
    </Fragment>
  );
};

IndicatorList.propTypes = {
  auth: PropTypes.object.isRequired,
  climateList: PropTypes.object.isRequired,
  cityId: PropTypes.number.isRequired,
  startYear: PropTypes.number.isRequired,
  endYear: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  climateList: state.climate,
});
export default connect(mapStateToProps, {
  getIndicatorList,
  getIndicatorByCity,
})(IndicatorList);
