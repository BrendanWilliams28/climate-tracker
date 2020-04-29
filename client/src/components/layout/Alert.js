import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MaterialAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

const Alert = ({ alerts }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map(alert => (
          <MaterialAlert
            variant='filled'
            key={alert.id}
            severity={alert.alertType}
          >
            {alert.msg}
          </MaterialAlert>
        ))}
    </div>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
