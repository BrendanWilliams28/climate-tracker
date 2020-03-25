import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProjectActions = ({ _id }) => (
  <div className='dash-buttons'>
    <Link to={`/view-project/${_id}`} className='btn btn-primary'>
      <i className='fas fa-chart-line text-default' /> View Project
    </Link>
    <Link to={`/edit-project/${_id}`} className='btn btn-default'>
      <i className='fas fa-edit text-default' /> Edit Project
    </Link>
    <Link to={`/delete-project/${_id}`} className='btn btn-danger'>
      <i className='fas fa-trash-alt text-danger' /> Delete Project
    </Link>
  </div>
);

ProjectActions.propTypes = {
  _id: PropTypes.string.isRequired
};

export default ProjectActions;
