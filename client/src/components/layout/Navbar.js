import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getCurrentUser, updateTheme } from '../../actions/user';
import logo from '../../img/logo.png';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MoreIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import { Switch as SwitchControl } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const initialState = {
  name: '',
  email: '',
  avatar: '',
  selectedTheme: 'light',
};

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  inputRoot: {
    color: 'inherit',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export const Navbar = ({
  auth: { isAuthenticated, loading },
  logout,
  user: { user, loading: userLoading },
  getCurrentUser,
  updateTheme,
  toggleDarkMode,
  currentTheme,
  history,
}) => {
  const classes = useStyles();

  const [userProfile, setUserProfile] = useState(initialState);

  useEffect(() => {
    if (isAuthenticated && user === null) getCurrentUser();
    if (!userLoading) {
      const userData = { ...initialState };
      for (const key in user) {
        if (key in userData) userData[key] = user[key];
      }
      setUserProfile(userData);

      if (userData.selectedTheme !== currentTheme.palette.type) {
        toggleDarkMode();
      }
    }
  }, [
    userLoading,
    getCurrentUser,
    user,
    isAuthenticated,
    currentTheme.palette.type,
    toggleDarkMode,
  ]);

  const { name, email, avatar } = userProfile;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuCloseAndLogout = () => {
    setAnchorEl(null);
    handleMobileMenuClose();

    setUserProfile(initialState);
    logout(history);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleThemeSwitch = (event) => {
    if (event.target.checked) {
      updateTheme({ selectedTheme: 'dark' });
    } else {
      updateTheme({ selectedTheme: 'light' });
    }
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user ? (
        <div>
          <MenuItem disabled={true}>{name}</MenuItem>
          <MenuItem disabled={true}>{email}</MenuItem>
          <Divider />
        </div>
      ) : null}
      <MenuItem onClick={handleMenuClose} component={Link} to='/edit-profile'>
        Edit Profile
      </MenuItem>
      <MenuItem
        onClick={handleMenuClose}
        component={Link}
        to='/change-password'
      >
        Change Password
      </MenuItem>
      <MenuItem onClick={handleMenuCloseAndLogout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        {user ? (
          <FormControlLabel
            control={
              <SwitchControl
                onChange={handleThemeSwitch}
                onClick={toggleDarkMode}
                name='templateSwitch'
                checked={currentTheme.palette.type === 'dark'}
              />
            }
            label='Theme'
          />
        ) : null}
      </MenuItem>
      <MenuItem component={Link} to='/dashboard'>
        <IconButton aria-label='Show My Cities' color='inherit'>
          <DashboardIcon />
        </IconButton>
        <p>Dashboard</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='User Profile'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <Avatar src={avatar} alt='avatar' />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const location = useLocation();

  return location.pathname === '/login' || location.pathname === '/' ? null : (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Link to='/dashboard'>
            <img src={logo} alt='Climate Hub' />
          </Link>

          {!loading && isAuthenticated ? (
            <Fragment>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <FormControlLabel
                  control={
                    <SwitchControl
                      onChange={handleThemeSwitch}
                      onClick={toggleDarkMode}
                      name='templateSwitch'
                      checked={currentTheme.palette.type === 'dark'}
                    />
                  }
                  label='Theme'
                />

                <MenuItem component={Link} to='/dashboard'>
                  <IconButton aria-label='Show My Cities' color='inherit'>
                    <DashboardIcon />
                  </IconButton>
                  <p>Dashboard</p>
                </MenuItem>

                <MenuItem onClick={handleProfileMenuOpen}>
                  <IconButton
                    aria-label='User Profile'
                    aria-controls={menuId}
                    aria-haspopup='true'
                    color='inherit'
                  >
                    <Avatar src={avatar} alt='avatar' />
                  </IconButton>
                </MenuItem>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label='show more'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  color='inherit'
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Fragment>
          ) : null}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  updateTheme: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, {
  logout,
  getCurrentUser,
  updateTheme,
})(withRouter(Navbar));
