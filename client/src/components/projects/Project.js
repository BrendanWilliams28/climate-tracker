import React from 'react';
import ProjectActions from './ProjectActions';
import PropTypes from 'prop-types';

const Project = ({ project: { _id, title, description, city, updatedAt } }) => (
  <div>
    <h3 className='text-dark'>{city}</h3>

    <ProjectActions _id={_id} />
    <br />
    <hr />
  </div>
);

Project.propTypes = {
  project: PropTypes.object.isRequired
};

export default Project;
