import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentUser } from '../../actions/user';

export const Profile = ({ getCurrentUser, user: { user, loading }, auth }) => {
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
              <Link to={'/edit-profile'} className='btn btn-dark'>
                Edit Profile
              </Link>
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentUser })(Profile);
