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

import { useMounted } from '../../hooks/useMounted';
import ClimateSources from './ClimateSources';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
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
    <main>
      {project === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {/* Hero unit */}
          <div className={classes.heroContent}>
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
            </Container>
          </div>
          <Container maxWidth='md'>
            <Grid container spacing={2} justify='center'>
              <Grid item>
                {Object.keys(indicatorByCity).length === 0 ||
                indicatorByCityLoading ? (
                  <Spinner />
                ) : (
                  <Fragment>
                    <IndicatorList
                      cityId={project.cityId}
                      defaultValue={`${indicatorByCity.indicator.name}`}
                    />
                    <hr />
                    <Typography gutterBottom variant='h5' component='h2'>
                      {`${indicatorByCity.indicator.label}`}
                    </Typography>
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
    </main>
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
