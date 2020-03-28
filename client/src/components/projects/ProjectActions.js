import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProject } from '../../actions/projects';

const ProjectActions = ({ _id, deleteProject }) => (
  <div className='dash-buttons'>
    <Link to={`/view-project/${_id}`} className='btn btn-primary'>
      <i className='fas fa-chart-line text-default' /> View Project
    </Link>
    <Link to={`/edit-project/${_id}`} className='btn btn-default'>
      <i className='fas fa-edit text-default' /> Edit Project
    </Link>
    <button
      onClick={() => deleteProject(_id)}
      type='button'
      className='btn btn-danger'
    >
      <i className='fas fa-times' />
    </button>
  </div>
);

ProjectActions.propTypes = {
  _id: PropTypes.string.isRequired,
  deleteProject: PropTypes.func.isRequired
};

export default connect(null, { deleteProject })(ProjectActions);
