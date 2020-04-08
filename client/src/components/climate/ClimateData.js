import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IndicatorList from './IndicatorList';
import Spinner from '../layout/Spinner';
import { getProjectById } from '../../actions/projects';
import { getIndicatorByCity } from '../../actions/climate';

import { useMounted } from '../../hooks/useMounted';

const ClimateData = ({
  getProjectById,
  getIndicatorByCity,
  project: { project, loading },
  indicatorByCity,
  auth,
  match
}) => {
  const isMounted = useMounted();

  useEffect(() => {
    getProjectById(match.params.id);
  }, [getProjectById, match.params.id]);

  useEffect(() => {
    if (isMounted) {
      if (project) getIndicatorByCity(project.cityId);
    }
  }, [isMounted, getIndicatorByCity, project]);

  return (
    <Fragment>
      {project === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/dashboard' className='btn btn-light'>
            Back To Dashboard
          </Link>

          <h1 className='large text-primary'>{`Climate Data for ${project.city}`}</h1>
          <IndicatorList cityId={project.cityId} />
        </Fragment>
      )}
    </Fragment>
  );
};

ClimateData.propTypes = {
  getProjectById: PropTypes.func.isRequired,
  getIndicatorByCity: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  indicatorByCity: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.projects,
  indicatorByCity: state.climate,
  auth: state.auth
});

export default connect(mapStateToProps, { getProjectById, getIndicatorByCity })(
  ClimateData
);
