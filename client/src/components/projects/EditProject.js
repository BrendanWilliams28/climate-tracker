import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import LocationSearchInput from './LocationSearchInput';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProject, getProjectById } from '../../actions/projects';

import { useScript } from '../../hooks/useScript';

const initialState = {
  title: '',
  description: '',
  city: ''
};

const EditProject = ({
  project: { project, loading },
  updateProject,
  getProjectById,
  match,
  history
}) => {
  const [scriptLoaded, scriptError] = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`
  );

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!project) getProjectById(match.params.id);
    if (!loading) {
      const projectData = { ...initialState };
      for (const key in project) {
        if (key in projectData) projectData[key] = project[key];
      }
      setFormData(projectData);
    }
  }, [loading, getProjectById, project, match.params.id]);

  const { title, description, city } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    updateProject(project._id, formData, history, true);
  };

  // Get the city from the LocationSearchInput autocomplete component and save it to state
  const setFormLocation = (target, googleLocation) => {
    setFormData({ ...formData, [target]: googleLocation });
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Project</h1>
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
        {scriptLoaded && !scriptError && city ? (
          <div className='form-group'>
            <LocationSearchInput
              setFormLocation={setFormLocation}
              city={city}
            />
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

EditProject.propTypes = {
  updateProject: PropTypes.func.isRequired,
  getProjectById: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.projects
});

export default connect(mapStateToProps, { updateProject, getProjectById })(
  withRouter(EditProject)
);
