import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
          <Link to='/dashboard' className='btn btn-light'>
            Back To Dashboard
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === user._id && (
              <Fragment>
                <Link to={'/edit-profile'} className='btn btn-dark'>
                  Edit Profile
                </Link>
                <button
                  onClick={() => deleteUser(user._id)}
                  type='button'
                  className='btn btn-danger'
                >
                  <i className='fas fa-times' />
                </button>
              </Fragment>
            )}

          <br />
          <br />
          <div className='profile bg-light'>
            <img src={user.avatar} alt='avatar' className='round-img' />
            <div>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          </div>
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
