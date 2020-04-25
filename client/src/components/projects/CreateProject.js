import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import LocationSearchInput from './LocationSearchInput';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProject } from '../../actions/projects';
import Copyright from '../layout/Copyright';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useScript } from '../../hooks/useScript';

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

const CreateProject = ({ createProject, history }) => {
  const classes = useStyles();

  const [scriptLoaded, scriptError] = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`
  );

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    city: ''
  });

  const onSubmit = e => {
    e.preventDefault();
    createProject(formData, history);
  };

  // Get the city from the LocationSearchInput autocomplete component and save it to state
  const setFormLocation = (target, googleLocation) => {
    setFormData({ ...formData, [target]: googleLocation });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Add New City
        </Typography>
        <Typography component='subtitle2' variant='h5'>
          Enter a city to begin tracking climate.
        </Typography>
        <form
          className={classes.form}
          onSubmit={e => onSubmit(e)}
          autoComplete='off'
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {scriptLoaded && !scriptError ? (
                <div className='form-group'>
                  <LocationSearchInput setFormLocation={setFormLocation} />
                </div>
              ) : (
                <Spinner />
              )}
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Submit
          </Button>

          <Button
            fullWidth
            variant='contained'
            color='primary'
            href='/dashboard'
          >
            Back
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

CreateProject.propTypes = {
  createProject: PropTypes.func.isRequired
};

export default connect(null, { createProject })(withRouter(CreateProject));
