import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getIndicatorList } from '../../actions/climate';

const IndicatorList = ({
  getIndicatorList,
  auth: { user },
  climateList: { indicatorList, loading }
}) => {
  useEffect(() => {
    getIndicatorList();
  }, [getIndicatorList]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {indicatorList.length > 0 ? (
        <Fragment>
          <ul>
            {indicatorList.map(indicator => (
              <li key={indicator.name}>
                <Link to={`/climate-data/${indicator.name}`}>
                  {' '}
                  {indicator.label}{' '}
                </Link>
                <br />- {indicator.description}
              </li>
            ))}
          </ul>
        </Fragment>
      ) : (
        <h4>No climate indicators loaded</h4>
      )}
    </Fragment>
  );
};

IndicatorList.propTypes = {
  auth: PropTypes.object.isRequired,
  climateList: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  climateList: state.climate
});
export default connect(mapStateToProps, { getIndicatorList })(IndicatorList);
