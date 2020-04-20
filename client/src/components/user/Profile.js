import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import User from './User';
import Spinner from '../layout/Spinner';
import { getCurrentUser, deleteUser } from '../../actions/user';

export const Profile = ({
  getCurrentUser,
  user: { user, loading },
  auth,
  deleteUser
}) => {
  const nullUser = !user;
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser, nullUser]);

  return (
    <Fragment>
      {user === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/dashboard' className='btn btn-primary'>
            <i className='fas fa-long-arrow-alt-left text-default' /> Back To
            Dashboard
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === user._id && (
              <Fragment>
                <Link to={'/edit-profile'} className='btn btn-dark'>
                  <i className='fas fa-edit text-default' /> Edit Profile
                </Link>
                <Link to={'/change-password'} className='btn btn-light'>
                  <i className='fas fa-lock text-default' /> Change Password
                </Link>
                <button
                  onClick={() => deleteUser(user._id)}
                  type='button'
                  className='btn btn-danger'
                >
                  <i className='fas fa-times' /> Delete Account
                </button>
              </Fragment>
            )}

          <br />
          <br />
          <User key={user._id} user={user} />
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentUser, deleteUser })(
  Profile
);
