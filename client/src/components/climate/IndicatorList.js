import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getIndicatorList, getIndicatorByCity } from '../../actions/climate';

const IndicatorList = ({
  getIndicatorList,
  auth: { user },
  climateList: { indicatorList, loading },
  getIndicatorByCity,
  cityId,
  defaultValue
}) => {
  useEffect(() => {
    getIndicatorList();
  }, [getIndicatorList]);

  const setIndicator = indicator => {
    getIndicatorByCity(cityId, undefined, indicator);
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {indicatorList.length > 0 ? (
        <Fragment>
          <select
            defaultValue={defaultValue}
            onChange={e => setIndicator(e.currentTarget.value)}
            disabled={loading}
          >
            <option key='' value=''>
              Select
            </option>
            {indicatorList.map(indicator => (
              <option key={indicator.name} value={indicator.name}>
                {indicator.label}
              </option>
            ))}
          </select>
        </Fragment>
      ) : (
        <h4>No climate indicators loaded</h4>
      )}
    </Fragment>
  );
};

IndicatorList.propTypes = {
  auth: PropTypes.object.isRequired,
  climateList: PropTypes.object.isRequired,
  cityId: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  climateList: state.climate
});
export default connect(mapStateToProps, {
  getIndicatorList,
  getIndicatorByCity
})(IndicatorList);
