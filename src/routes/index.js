import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Search } from '../containers';

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/"
      component={Search}
    />
    <Route path="/*" component={() => <Redirect to='/' />} />
  </Switch>
);

export default Routes;
