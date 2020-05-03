import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProjectList from '../projects/ProjectList';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Spinner from '../layout/Spinner';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundImage:
      'url(https://source.unsplash.com/featured/?nature,glacier)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed'
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  darkOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    padding: theme.spacing(8, 0, 6)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

const whiteText = {
  color: '#ffffff'
};

const Dashboard = ({ auth: { user, loading } }) => {
  const classes = useStyles();
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <CssBaseline />

      {/* Hero unit */}
      <div className={classes.heroContent}>
        <div className={classes.darkOverlay}>
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='textPrimary'
              gutterBottom
              style={whiteText}
            >
              Dashboard
            </Typography>
            <Typography
              variant='h5'
              align='center'
              color='textSecondary'
              paragraph
              style={whiteText}
            >
              Track climate data of any US city.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify='center'>
                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    href='/create-project'
                  >
                    Add City
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </div>
      {user === null ? <Spinner /> : <ProjectList />}
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
