import React, {Component} from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import LandingPage from '../Landing';
import SignInPage from '../SignIn';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import PassForgetPage from '../PasswordForget';
import ResetEmailSent from '../PasswordForget/resetEmailSent';


import * as ROUTES from '../../constants/routes';
import { withAuth } from '../Session';


class App extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Navigation />
                    <hr />
                    <Route exact path={ROUTES.LANDING} component={LandingPage} />
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                    <Route path={ROUTES.HOME} component={HomePage} />
                    <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                    <Route path={ROUTES.ADMIN} component={AdminPage} />
                    <Route path={ROUTES.PASSWORD_FORGET} component={PassForgetPage} />
                    <Route path={ROUTES.RESET_EMAIL_SENT} component={ResetEmailSent} />
                </div>
            </Router>
        )
    }
}

export default withAuth(App);
