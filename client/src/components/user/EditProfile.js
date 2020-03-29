import React, { useState, useEffect, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile, getCurrentUser } from '../../actions/user';

const initialState = {
  name: '',
  email: ''
};

const EditProfile = ({
  user: { user, loading },
  updateProfile,
  getCurrentUser,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!user) getCurrentUser();
    if (!loading) {
      const userData = { ...initialState };
      for (const key in user) {
        if (key in userData) userData[key] = user[key];
      }
      setFormData(userData);
    }
  }, [loading, getCurrentUser, user]);

  const { name, email } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    updateProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Profile</h1>
      <small>* = required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <small className='form-text'>
          This site uses Gravatar so if you want a profile image, use a Gravatar
          email
        </small>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/profile'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { updateProfile, getCurrentUser })(
  withRouter(EditProfile)
);
