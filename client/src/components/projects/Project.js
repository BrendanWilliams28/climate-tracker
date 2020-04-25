import React, { Fragment } from 'react';
import ProjectActions from './ProjectActions';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
}));

const Project = ({ project: { _id, city } }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid item key={_id} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={`https://source.unsplash.com/featured/?${city},city`}
            title={city}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant='h5' component='h2'>
              {city}
            </Typography>
          </CardContent>
          <CardActions>
            <ProjectActions _id={_id} />
          </CardActions>
        </Card>
      </Grid>
    </Fragment>
  );
};

Project.propTypes = {
  project: PropTypes.object.isRequired
};

export default Project;
