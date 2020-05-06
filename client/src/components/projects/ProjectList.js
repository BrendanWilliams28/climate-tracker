import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Project from './Project';
import Spinner from '../layout/Spinner';
import { getUserProjects } from '../../actions/projects';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const ProjectList = ({
  getUserProjects,
  auth: { user },
  projects: { projects, loading },
}) => {
  const classes = useStyles();

  useEffect(() => {
    getUserProjects();
  }, [getUserProjects, user]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      {projects.length > 0 ? (
        <Container className={classes.cardGrid} maxWidth='md'>
          <Grid container spacing={4}>
            {projects.map((project) => (
              <Project key={project._id} project={project} />
            ))}
          </Grid>
        </Container>
      ) : (
        <Container className={classes.cardGrid} maxWidth='md'>
          <Grid container spacing={4}>
            <Alert severity='info'>
              <AlertTitle>Create Your Dashboard</AlertTitle>
              Click the <strong>Add City</strong> button above to begin tracking
              a city's climate data.
            </Alert>
          </Grid>
        </Container>
      )}
    </Fragment>
  );
};

ProjectList.propTypes = {
  auth: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  projects: state.projects,
});

export default connect(mapStateToProps, { getUserProjects })(ProjectList);
