import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Project from '../user/Project';
import Spinner from '../layout/Spinner';
import { getUserProjects } from '../../actions/projects';

const ProjectList = ({
  getUserProjects,
  auth: { user },
  projects: { projects, loading }
}) => {
  useEffect(() => {
    getUserProjects();
  }, [getUserProjects]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {projects.length > 0 ? (
        <Fragment>
          {projects.map(project => (
            <Project key={project._id} project={project} />
          ))}
        </Fragment>
      ) : (
        <h4>You don't have any projects yet. </h4>
      )}
    </Fragment>
  );
};

ProjectList.propTypes = {
  auth: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  projects: state.projects
});

export default connect(mapStateToProps, { getUserProjects })(ProjectList);
