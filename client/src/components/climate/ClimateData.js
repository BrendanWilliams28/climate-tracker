import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IndicatorList from './IndicatorList';

const ClimateData = ({ auth: { user } }) => {
  return (
    <Fragment>
      <h1 className='large text-primary'>Climate Data</h1>
      <IndicatorList />
    </Fragment>
  );
};

ClimateData.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ClimateData);
