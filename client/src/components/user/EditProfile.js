import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile, getCurrentUser, deleteUser } from '../../actions/user';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const initialState = {
  name: '',
  email: '',
  avatar: ''
};

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

const EditProfile = ({
  user: { user, loading },
  updateProfile,
  getCurrentUser,
  deleteUser,
  history
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState(initialState);

  const [showDeleteButton, setShowDeleteButton] = useState(false);

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

  const { name, email, avatar } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    updateProfile(formData, history);
  };

  const showDeleteButtonClick = () => {
    showDeleteButton ? setShowDeleteButton(false) : setShowDeleteButton(true);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} src={avatar} alt='avatar' />
        <Typography component='h1' variant='h5'>
          Edit Profile
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='name'
                name='name'
                variant='outlined'
                fullWidth
                id='name'
                label='Name'
                autoFocus
                value={name}
                onChange={onChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='email'
                variant='outlined'
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={email}
                onChange={onChange}
                required
              />
            </Grid>
          </Grid>

          <br />
          <Grid container spacing={2} justify='center'>
            <Grid item>
              <Button href='/dashboard' variant='contained'>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button type='submit' variant='contained' color='primary'>
                Submit
              </Button>
            </Grid>
          </Grid>

          <br />
          <hr />

          <Grid container justify='flex-end'>
            <Grid item>
              <Link
                href='#'
                onClick={() => showDeleteButtonClick()}
                variant='body2'
                color='secondary'
              >
                {showDeleteButton ? 'Cancel Delete' : 'Delete Account'}
              </Link>
            </Grid>
          </Grid>

          {showDeleteButton ? (
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={() => deleteUser(user._id)}
            >
              Confirm Delete Account
            </Button>
          ) : null}
        </form>
      </div>
    </Container>
  );
};

EditProfile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {
  updateProfile,
  getCurrentUser,
  deleteUser
})(withRouter(EditProfile));
