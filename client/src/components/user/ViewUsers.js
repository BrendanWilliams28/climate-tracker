import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserList from './UserList';

const ViewUsers = ({ auth: { user } }) => {
  return (
    <Fragment>
      <h1 className='large text-primary'>Users</h1>
      <hr />
      <UserList />
    </Fragment>
  );
};

ViewUsers.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ViewUsers);
