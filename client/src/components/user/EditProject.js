import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProject, getProjectById } from '../../actions/projects';

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
  }, [loading, getProjectById, project]);

  const { title, description, city } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    updateProject(project._id, formData, history, true);
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
