import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from './User';
import Spinner from '../layout/Spinner';
import { getCurrentUser, deleteUser } from '../../actions/user';
import Copyright from '../layout/Copyright';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export const Profile = ({
  getCurrentUser,
  user: { user, loading },
  auth,
  deleteUser
}) => {
  const classes = useStyles();

  const nullUser = !user;
  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser, nullUser]);

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        {user === null || loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <User key={user._id} user={user} />

            <Button variant='contained' color='primary' href='/edit-profile'>
              Edit
            </Button>

            <Button variant='contained' color='primary' href='/change-password'>
              Change Password
            </Button>

            <Button
              variant='contained'
              color='primary'
              onClick={() => deleteUser(user._id)}
            >
              Delete Account
            </Button>
          </Fragment>
        )}
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
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
