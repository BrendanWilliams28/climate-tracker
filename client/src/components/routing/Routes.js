import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import Profile from '../user/Profile';
import CreateProject from '../projects/CreateProject';
import EditProject from '../projects/EditProject';
import ViewProject from '../projects/ViewProject';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/profile' component={Profile} />
        <PrivateRoute exact path='/create-project' component={CreateProject} />
        <PrivateRoute exact path='/edit-project/:id' component={EditProject} />
        <PrivateRoute exact path='/view-project/:id' component={ViewProject} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
