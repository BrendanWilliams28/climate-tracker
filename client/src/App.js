import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/auth/Login';
import Routes from './components/routing/Routes';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './components/layout/Copyright';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

//if (localStorage.token) {
//  setAuthToken(localStorage.token);
//}

const themeObject = {
  palette: {
    type: 'light',
  },
};
const useDarkMode = () => {
  const [theme, setTheme] = useState(themeObject);

  const {
    palette: { type },
  } = theme;
  const toggleDarkMode = () => {
    const updatedTheme = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === 'light' ? 'dark' : 'light',
      },
    };
    setTheme(updatedTheme);
  };
  return [theme, toggleDarkMode];
};

const App = () => {
  const [theme, toggleDarkMode] = useDarkMode();
  const themeConfig = createMuiTheme(theme);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Provider store={store}>
        <ThemeProvider theme={themeConfig}>
          <Router>
            <Fragment>
              <div>
                <Navbar currentTheme={theme} toggleDarkMode={toggleDarkMode} />
                <Switch>
                  <Route exact path='/' component={Landing} />
                  <Route component={Routes} />
                </Switch>
              </div>
              <Copyright />
            </Fragment>
          </Router>
        </ThemeProvider>
      </Provider>
    </div>
  );
};

export default App;
