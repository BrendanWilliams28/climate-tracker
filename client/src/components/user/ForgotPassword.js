import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { resetPassword } from '../../actions/user';

const ForgotPassword = ({ setAlert, resetPassword, history }) => {
  const [formData, setFormData] = useState({
    email: ''
  });

  const { email } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    resetPassword(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Reset Password</h1>
      <small>Please enter your account email to receive a reset password</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

ForgotPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired
};

export default connect(null, { setAlert, resetPassword })(
  withRouter(ForgotPassword)
);
