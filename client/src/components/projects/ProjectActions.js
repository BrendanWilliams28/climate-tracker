import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProject } from '../../actions/projects';

const ProjectActions = ({ _id, deleteProject }) => {
  return (
    <div className='dash-buttons'>
      <Link to={`/climate/${_id}`} className='btn btn-success'>
        <i className='fas fa-leaf text-default' /> Climate Data
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
};

ProjectActions.propTypes = {
  _id: PropTypes.string.isRequired,
  deleteProject: PropTypes.func.isRequired
};

export default connect(null, { deleteProject })(ProjectActions);
