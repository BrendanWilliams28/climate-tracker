import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IndicatorList from './IndicatorList';
import Spinner from '../layout/Spinner';
import LineChart from '../charts/LineChart';
import { getProjectById } from '../../actions/projects';
import { getIndicatorByCity } from '../../actions/climate';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useMounted } from '../../hooks/useMounted';
import ClimateSources from './ClimateSources';

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

const ClimateData = ({
  getProjectById,
  getIndicatorByCity,
  project: { project, loading },
  indicatorByCity: { indicatorByCity, loading: indicatorByCityLoading },
  auth,
  match
}) => {
  const classes = useStyles();

  const isMounted = useMounted();

  useEffect(() => {
    getProjectById(match.params.id);
  }, [getProjectById, match.params.id]);

  useEffect(() => {
    if (isMounted) {
      if (project) {
        if (project.cityId) getIndicatorByCity(project.cityId);
      }
    }
  }, [isMounted, getIndicatorByCity, project]);

  useEffect(() => {
    if (indicatorByCity) {
    }
  }, [indicatorByCity]);

  return (
    <Fragment>
      <CssBaseline />

      {project === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
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
                >
                  {`${project.city}`}
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify='center'>
                    <Grid item>
                      {Object.keys(indicatorByCity).length === 0 ||
                      indicatorByCityLoading ? (
                        <Spinner />
                      ) : (
                        <IndicatorList
                          cityId={project.cityId}
                          defaultValue={`${indicatorByCity.indicator.name}`}
                        />
                      )}
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </div>
          </div>
          <Container maxWidth='md'>
            <Grid container spacing={2} justify='center'>
              <Grid item>
                {Object.keys(indicatorByCity).length === 0 ||
                indicatorByCityLoading ? (
                  <Spinner />
                ) : (
                  <Fragment>
                    <br />
                    <Typography>
                      {`${indicatorByCity.indicator.description}`}
                    </Typography>
                    <p></p>
                    <LineChart data={indicatorByCity} />
                    <hr />
                    <ClimateSources />
                  </Fragment>
                )}
              </Grid>
            </Grid>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

ClimateData.propTypes = {
  getProjectById: PropTypes.func.isRequired,
  getIndicatorByCity: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  indicatorByCity: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  project: state.projects,
  indicatorByCity: state.climate,
  auth: state.auth
});

export default connect(mapStateToProps, { getProjectById, getIndicatorByCity })(
  ClimateData
);
