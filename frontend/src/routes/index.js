import React from 'react';
import { Switch } from 'react-router-dom';
import Dashboard from '~/pages/Dashboard';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Route from './Route';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/register" component={SignUp} />

            <Route path="/dashboard" component={Dashboard} isPrivate />
        </Switch>
    );
}
