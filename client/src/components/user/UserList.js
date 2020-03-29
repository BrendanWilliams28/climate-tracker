import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import User from './User';
import Spinner from '../layout/Spinner';
import { getUsers } from '../../actions/user';

const UserList = ({ getUsers, auth: { user }, users: { users, loading } }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {users.length > 0 ? (
        <Fragment>
          {users.map(user => (
            <User key={user._id} user={user} />
          ))}
        </Fragment>
      ) : (
        <h4>There are no users yet. </h4>
      )}
    </Fragment>
  );
};

UserList.propTypes = {
  auth: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.user
});

export default connect(mapStateToProps, { getUsers })(UserList);
