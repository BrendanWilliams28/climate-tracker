import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/auth/Login';
import Routes from './components/routing/Routes';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './components/layout/Copyright';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }
}));

const App = () => {
  const classes = useStyles();

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Provider store={store}>
        <Router>
          <Fragment>
            <div>
              <Navbar />
              <Switch>
                <Route exact path='/' component={Landing} />
                <Route component={Routes} />
              </Switch>
            </div>
            <Copyright />
          </Fragment>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
