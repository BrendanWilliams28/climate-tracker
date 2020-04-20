import React, { useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { updatePassword } from '../../actions/user';

const ChangePassword = ({ setAlert, updatePassword, history }) => {
  const [formData, setFormData] = useState({
    password: '',
    password2: ''
  });

  const { password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      updatePassword(formData, history);
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Change Password</h1>

      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='password'
            placeholder='New Password'
            name='password'
            minLength='6'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/profile'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

ChangePassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired
};

export default connect(null, { setAlert, updatePassword })(
  withRouter(ChangePassword)
);
