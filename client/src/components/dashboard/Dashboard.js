import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProjectList from '../projects/ProjectList';

const Dashboard = ({ auth: { user } }) => {
  return (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome, {user && user.name}
      </p>
      <Fragment>
        <Link to='/create-project' className='btn btn-primary my-1'>
          <i className='fas fa-plus-circle' /> Add City
        </Link>
      </Fragment>
      <hr />
      <ProjectList />
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
