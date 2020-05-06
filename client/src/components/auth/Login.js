import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import logo from '../../img/logo_big.png';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:
      'url(https://source.unsplash.com/featured/?nature,glacier)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Login = ({ login, isAuthenticated }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={logo} alt='Climate Hub' />
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              type='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              minLength='6'
              value={password}
              onChange={(e) => onChange(e)}
              required
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  component={RouterLink}
                  to='/forgot-password'
                  variant='body2'
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to='/register' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Typography variant='body2' color='textSecondary' align='center'>
                {'Copyright © '}
                <Link
                  color='inherit'
                  href='https://pactlegacy.com/'
                  target='_blank'
                >
                  Pact Legacy
                </Link>{' '}
                {new Date().getFullYear()}
              </Typography>
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
