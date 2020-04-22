import React, { Fragment, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginReset } from '../../actions/auth';

export const ResetPassword = ({
  loginReset,
  match,
  isAuthenticated,
  history
}) => {
  useEffect(() => {
    if (match.params.token) {
      loginReset(match.params.token, history);
    }
  }, [loginReset, match.params.token, history]);

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/change-password' />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Logging in with reset password...</h1>
    </Fragment>
  );
};

ResetPassword.propTypes = {
  loginReset: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { loginReset })(
  withRouter(ResetPassword)
);
