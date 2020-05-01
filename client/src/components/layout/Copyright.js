import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800]
  }
}));

export const Copyright = props => {
  const classes = useStyles();

  const location = useLocation();

  return location.pathname === '/login' || location.pathname === '/' ? null : (
    <Fragment>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth='sm'>
          <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyright © '}
            <Link
              color='inherit'
              href='https://pactlegacy.com/'
              target='_blank'
            >
              Pact Legacy
            </Link>{' '}
            {new Date().getFullYear()}
          </Typography>
        </Container>
      </footer>
    </Fragment>
  );
};

export default Copyright;
