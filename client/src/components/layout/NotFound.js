import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity='info'>
        <AlertTitle>Page Not Found</AlertTitle>
        Sorry, this page does not exist
      </Alert>
    </div>
  );
};

export default NotFound;
