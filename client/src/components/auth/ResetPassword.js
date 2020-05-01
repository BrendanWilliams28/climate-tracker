import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginReset } from '../../actions/auth';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
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
  }
}));

export const ResetPassword = ({
  loginReset,
  match,
  isAuthenticated,
  history
}) => {
  const classes = useStyles();

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
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Logging in with reset password...
        </Typography>
      </div>
    </Container>
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
