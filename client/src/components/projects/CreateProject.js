import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import LocationSearchInput from './LocationSearchInput';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProject } from '../../actions/projects';

import { useScript } from '../../hooks/useScript';

const CreateProject = ({ createProject, history }) => {
  const [scriptLoaded, scriptError] = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`
  );

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    city: ''
  });

  const { title, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProject(formData, history);
  };

  // Get the city from the LocationSearchInput autocomplete component and save it to state
  const setFormLocation = (target, googleLocation) => {
    setFormData({ ...formData, [target]: googleLocation });
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Add New City</h1>
      <p className='lead'>
        <i className='fas fa-city' /> Select a city to begin tracking climate.
      </p>

      <form className='form' onSubmit={onSubmit} autoComplete='off'>
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
        {scriptLoaded && !scriptError ? (
          <div className='form-group'>
            <LocationSearchInput setFormLocation={setFormLocation} />
          </div>
        ) : (
          <Spinner />
        )}

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
