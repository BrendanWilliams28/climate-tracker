import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getClimateSources } from '../../actions/climate';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import StorageIcon from '@material-ui/icons/Storage';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const ClimateSources = ({
  getClimateSources,
  sources: { sources, loading },
  auth
}) => {
  const classes = useStyles();
  const [openDataSet, setOpenDataSet] = useState(false);
  const [openScenarios, setOpenScenarios] = useState(false);
  const [openModels, setOpenModels] = useState(false);

  const handleDataSetClick = () => {
    setOpenDataSet(!openDataSet);
  };

  const handleScenariosClick = () => {
    setOpenScenarios(!openScenarios);
  };

  const handleModelsClick = () => {
    setOpenModels(!openModels);
  };

  useEffect(() => {
    if (!loading) getClimateSources();
  }, [getClimateSources, loading]);

  return (
    <Fragment>
      <Typography
        component='h5'
        variant='h5'
        align='center'
        color='textPrimary'
        gutterBottom
      >
        Sources
      </Typography>

      {Object.keys(sources).length === 0 ? (
        <Spinner />
      ) : (
        <Fragment>
          <List
            component='nav'
            aria-labelledby='nested-list-subheader'
            className={classes.root}
          >
            <ListItem button onClick={handleDataSetClick}>
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText primary='Data Set' />
              {openDataSet ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openDataSet} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItem
                  className={classes.nested}
                  key={sources.dataSet.label}
                >
                  <ListItemText
                    inset={true}
                    primary={sources.dataSet.label}
                    secondary={sources.dataSet.description}
                  />
                </ListItem>
              </List>
            </Collapse>
          </List>
          <br />

          <List
            component='nav'
            aria-labelledby='nested-list-subheader'
            className={classes.root}
          >
            <ListItem button onClick={handleScenariosClick}>
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText primary='Scenarios' />
              {openScenarios ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openScenarios} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {sources.scenario.map(scenario => (
                  <ListItem className={classes.nested} key={scenario.name}>
                    <ListItemText
                      primary={scenario.label}
                      secondary={scenario.description}
                      inset={true}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
          <br />
          <List
            component='nav'
            aria-labelledby='nested-list-subheader'
            className={classes.root}
          >
            <ListItem button onClick={handleModelsClick}>
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText primary='Climate Models' />
              {openModels ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openModels} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {sources.dataSet.models.map(climateModel => (
                  <ListItem className={classes.nested} key={climateModel}>
                    <ListItemText primary={climateModel} inset={true} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
        </Fragment>
      )}
    </Fragment>
  );
};

ClimateSources.propTypes = {
  getClimateSources: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  sources: state.climate,
  auth: state.auth
});

export default connect(mapStateToProps, { getClimateSources })(ClimateSources);
