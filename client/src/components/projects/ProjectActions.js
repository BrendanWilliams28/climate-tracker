import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteProject } from '../../actions/projects';
import Button from '@material-ui/core/Button';

const ProjectActions = ({ _id, deleteProject }) => {
  return (
    <Fragment>
      <Button
        size='small'
        color='primary'
        component={Link}
        to={`/climate/${_id}`}
      >
        View Climate Data
      </Button>
      <Button size='small' color='primary' onClick={() => deleteProject(_id)}>
        Delete
      </Button>
    </Fragment>
  );
};

ProjectActions.propTypes = {
  _id: PropTypes.string.isRequired,
  deleteProject: PropTypes.func.isRequired,
};

export default connect(null, { deleteProject })(ProjectActions);
