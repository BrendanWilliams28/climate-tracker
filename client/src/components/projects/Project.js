import React from 'react';
import ProjectActions from './ProjectActions';
import PropTypes from 'prop-types';

const Project = ({ project: { _id, title, description, updatedAt } }) => (
  <div>
    <h3 className='text-dark'>{title}</h3>
    <p>
      <strong>Description: </strong> {description}
    </p>
    <p>
      <strong>Last Update: </strong> {updatedAt}
    </p>

    <ProjectActions _id={_id} />
    <br />
    <hr />
  </div>
);

Project.propTypes = {
  project: PropTypes.object.isRequired
};

export default Project;
