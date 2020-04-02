import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProjectById } from '../../actions/projects';

const ViewProject = ({
  getProjectById,
  project: { project, loading },
  auth,
  match
}) => {
  const nullProject = !project;
  useEffect(() => {
    getProjectById(match.params.id);
  }, [getProjectById, match.params.id, nullProject]);

  return (
    <Fragment>
      {project === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/dashboard' className='btn btn-light'>
            Back To Dashboard
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === project.user && (
              <Link
                to={`/edit-project/${project._id}`}
                className='btn btn-dark'
              >
                Edit Project
              </Link>
            )}
          <div>
            <h3 className='text-dark'>{project.title}</h3>
            <p>
              <strong>Description: </strong> {project.description}
            </p>
            <p>
              <strong>City: </strong> {project.city}
            </p>
            <p>
              <strong>Last Update: </strong> {project.updatedAt}
            </p>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

ViewProject.propTypes = {
  getProjectById: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.projects,
  auth: state.auth
});

export default connect(mapStateToProps, { getProjectById })(ViewProject);
