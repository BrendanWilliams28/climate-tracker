import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user: { _id, avatar, name, email } }) => (
  <div className='profile bg-light'>
    <img src={avatar} alt='avatar' className='round-img' />
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  </div>
);

User.propTypes = {
  user: PropTypes.object.isRequired
};

export default User;
