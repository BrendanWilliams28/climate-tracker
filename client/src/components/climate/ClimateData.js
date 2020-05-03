import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import IndicatorList from './IndicatorList';
import Spinner from '../layout/Spinner';
import LineChart from '../charts/LineChart';
import { getProjectById } from '../../actions/projects';
import { getIndicatorByCity } from '../../actions/climate';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function sliderValuetext(value) {
  return `${value}`;
}

const whiteText = {
  color: '#ffffff'
};

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

  const [sliderValue, setSliderValue] = useState([1950, 2100]);
  const [startYear, setStartYear] = useState(1950);
  const [endYear, setEndYear] = useState(2100);

  const handleSliderChange = (event, newValue) => {
    let years = newValue.toString().split(',');
    setStartYear(years[0]);
    setEndYear(years[1]);

    setSliderValue(newValue);
  };

  const handleSliderChangeCommitted = () => {
    getIndicatorByCity(
      project.cityId,
      undefined,
      indicatorByCity.indicator.name,
      startYear,
      endYear
    );
  };

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
              <Container maxWidth='md'>
                <Typography
                  component='h1'
                  variant='h2'
                  align='center'
                  color='textPrimary'
                  gutterBottom
                  style={whiteText}
                >
                  {`${project.city}`}
                </Typography>
              </Container>
            </div>
          </div>
          <Container maxWidth='md'>
            <Grid container spacing={2} justify='center'>
              <Grid item>
                {Object.keys(indicatorByCity).length === 0 ||
                indicatorByCityLoading ? (
                  <Fragment>
                    <br />
                    <Spinner />
                  </Fragment>
                ) : (
                  <Fragment>
                    <IndicatorList
                      cityId={project.cityId}
                      defaultValue={`${indicatorByCity.indicator.name}`}
                      startYear={Number(startYear)}
                      endYear={Number(endYear)}
                    />
                    <br />
                    <Typography>
                      {`${indicatorByCity.indicator.description}`}
                    </Typography>
                    <p></p>
                    <LineChart data={indicatorByCity} />

                    <Slider
                      onChange={handleSliderChange}
                      valueLabelDisplay='on'
                      aria-labelledby='range-slider'
                      getAriaValueText={sliderValuetext}
                      min={1950}
                      max={2100}
                      value={sliderValue}
                    />

                    <Grid container spacing={2} justify='center'>
                      <Grid item>
                        <Button
                          type='submit'
                          variant='contained'
                          color='primary'
                          onClick={handleSliderChangeCommitted}
                        >
                          Set Date Range
                        </Button>
                      </Grid>
                    </Grid>

                    <br />
                    <Divider />
                    <br />

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
