import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProject } from '../../actions/projects';

const CreateProject = ({ createProject, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    city: ''
  });

  const { title, description, city } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProject(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create New Project</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Start a new project to begin tracking
        climate.
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Project Title'
            name='title'
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Description'
            name='description'
            value={description}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='city'
            value={city}
            onChange={onChange}
            required
          />
          <small className='form-text'>
            US City & state required (eg. Boston, MA)
          </small>
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProject.propTypes = {
  createProject: PropTypes.func.isRequired
};

export default connect(null, { createProject })(withRouter(CreateProject));
