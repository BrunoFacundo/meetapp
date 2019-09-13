import React from 'react';
import { Switch } from 'react-router-dom';
import Dashboard from '~/pages/Dashboard';
import Meetup from '~/pages/Meetup';
import MeetupDetail from '~/pages/MeetupDetail';
import Profile from '~/pages/Profile';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Route from './Route';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/register" exact component={SignUp} />

            <Route path="/dashboard" exact component={Dashboard} isPrivate />
            <Route path="/profile" exact component={Profile} isPrivate />

            <Route path="/meetup" exact component={Meetup} isPrivate />
            <Route path="/meetup/detail" exact component={MeetupDetail} isPrivate />
        </Switch>
    );
}
