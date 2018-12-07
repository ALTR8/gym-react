import React, {Component} from 'react';

import { withFirebase } from '../Firebase';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import LandingPage from '../Landing';
import SignInPage from '../SignIn';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            authUser: null
        };
    }

    componentDidMount() {
        console.log(this.props);
        this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
            authUser ? this.setState({ authUser: this.props.firebase.auth.currentUser.providerData[0] }) : this.setState({ authUser: null });
        });
        console.log(this.listener);
        console.log(this.props.firebase.auth);
    }

    componentWillUnmount() {
        this.listener()
    }

    render() {
        return (
            <Router>
                <div>
                    <Navigation authUser={this.state.authUser}/>

                    <hr />
                    <Route exact path={ROUTES.LANDING} component={LandingPage} />
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                    <Route path={ROUTES.HOME} component={HomePage} />
                    <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                    <Route path={ROUTES.ADMIN} component={AdminPage} />
                </div>
            </Router>
        )
    }
}

export default withFirebase(App);
