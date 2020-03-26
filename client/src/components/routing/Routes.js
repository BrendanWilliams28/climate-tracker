import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProject from '../user/CreateProject';
import ViewProject from '../user/ViewProject';
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
        <PrivateRoute exact path='/create-project' component={CreateProject} />
        <PrivateRoute exact path='/view-project/:id' component={ViewProject} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
